// const cheerio = require("cheerio");
const glob = require("glob-promise");
const path = require("path");
const fs = require("fs-extra");
const camelcase = require("camelcase");
import svgr from '@svgr/core';

const { icons } = require("../icons");

// file path
const rootDir = path.resolve(__dirname, "../src");
const buildDir = path.resolve(__dirname, "../build");
const DIST = path.resolve(rootDir, ".");
const ES = path.resolve(rootDir, "generated");

// utils function
async function createDirIfNotExist (directory) {
  try {
    await fs.ensureDir(directory)
    console.log(`create <${directory}> success!`)
  } catch (err) {
    console.error(err)
  }
}

// logic

async function getIconFiles(content) {
  return glob(content.files);
}

async function dirInit() {
  await createDirIfNotExist(DIST);
  await createDirIfNotExist(ES);
  await createDirIfNotExist(buildDir);
}

async function getSvgStr(file, name) {
  const svgCode = await fs.readFile(file, "utf8");
  const jsxCode = await svgr(svgCode, {
    plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
    svgoConfig: {
      plugins: [{
        removeHiddenElems: false
      }, {
        removeEmptyContainers: true
      }, {
        removeAttrs: {attrs: '(class|id)'},
      }, {
        removeStyleElement: true
      }]
    },
    replaceAttrValues: {
      '#231f20': 'inherit'
    },
    template: (
      { template },
      opts,
      { imports, componentName, jsx, exports }
    ) => template.ast`
      ${imports}
      const ${componentName} = () => ${jsx}
      ${exports}
    `
  }, {
    componentName: name
  });
  return jsxCode
    .replace(/<svg.*?>/, '<React.Fragment>')
    .replace(/<\/svg>/, '</React.Fragment>');
}

async function writeIconComponent(write, name, file) {
  await createDirIfNotExist(path.resolve(ES, name));
  // write icon component
  const iconData = await getSvgStr(file, name);
  await write(path.resolve(ES, name, `${name}.js`), iconData);
  // write icon component definition
  const iconDifinition = `declare const ${name}: React.ComponentType;
export default ${name};\n`;
  await write(path.resolve(ES, name, `${name}.d.ts`), iconDifinition);
  // write icon index
  const indexData = `export { default } from './${name}';\n`;
  await write(path.resolve(ES, name, `index.js`), indexData);
  // write icon index definition
  const indexDefinition = `export { default } from './${name}';
export * from './${name}';\n`;
  await write(path.resolve(ES, name, `index.d.ts`), indexDefinition);
}

function addContentToIndexFile(indexStr, name) {
  return indexStr + `export { default as ${name} } from './${name}';\n`;
}

async function writeIconModule(icon) {
  const write = (filePath, str) =>
    fs.writeFile(filePath, str, "utf8");
  const exists = new Set(); // for remove duplicate
  let indexStr = '';
  for (const content of icon.contents) {
    const files = await getIconFiles(content);
    for (const file of files) {
      const rawName = path.basename(file, path.extname(file));
      const pascalName = camelcase(rawName, { pascalCase: true });
      const name =
        (content.formatter && content.formatter(pascalName)) || pascalName;
      if (exists.has(name)) {
        continue;
      } else {
        exists.add(name);
        await writeIconComponent(write, name, file);
        indexStr = addContentToIndexFile(indexStr, name);
        exists.add(file);
        console.log(`created ${name}`);
      }
    }
  }
  await write(path.resolve(ES, `index.js`), indexStr);
  await write(path.resolve(ES, `index.d.ts`), indexStr);
}

async function main() {
  try {
    await dirInit();
    for (const icon of icons) {
      await writeIconModule(icon);
    }
    console.log("done");
  } catch (e) {
    console.error(e);
  }
}
main();
