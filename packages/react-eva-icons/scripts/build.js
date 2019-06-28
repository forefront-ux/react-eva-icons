const glob = require("glob-promise");
const path = require("path");
const fs = require("fs-extra");
import Mustache from 'mustache';
import SVGO from 'svgo';

const { icons } = require("../icons");

// file path
const rootDir = path.resolve(__dirname, "../src");
const DIST = path.resolve(rootDir, ".");

// svgo config
const svgo = new SVGO({
  floatPrecision: 4,
  plugins: [
    { removeHiddenElems: true },
    { removeEmptyContainers: true },
    { removeAttrs: {attrs: '(class|id|data-name)'} },
    { removeStyleElement: true },
  ],
});

// logic

async function getIconFiles(content) {
  return glob(content.files);
}

function getComponentName(file) {
  const fileName = path.basename(file, path.extname(file));
  const parts = fileName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.substring(1));
  return parts.join('');
}

// Noise introduced by Google by mistake
const noises = [
  ['<path fill="#fff" d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" />', ''],
  ['<path fill="#fff" d="M0 0h24v24H0V0zm0 0h24v24H0V0z" />', ''],
  ['<path fill="#fff" d="M0 0h24v24H0z" />', ''],
  ['="M0 0h24v24H0V0zm0 0h24v24H0V0z', '="'],
  ['="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z', '="'],
];

async function cleanPaths(svgPath, data) {
  // Remove hardcoded color fill before optimizing so that empty groups are removed
  const input = data
    .replace(/ fill="#231f20"/g, '')
    .replace(/<rect fill="#fff" width="24" height="24"\/>/g, '');

  const result = await svgo.optimize(input);

  // Extract the paths from the svg string
  // Clean xml paths
  let paths = result.data
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')
    .replace(/"\/>/g, '" />')
    .replace(/<defs\/>/g,'')
    .replace(/fill="#231f20"/g, '')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/ clip-path=".+?"/g, '') // Fix visibility issue and save some bytes.
    .replace(/<clipPath.+?<\/clipPath>/g, '') // Remove unused definitions
    .replace(/<path[^/]*d="M0 0h24v24H0z" \/>/g, '')
    .replace(/<path[^/]*d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" \/>/g, '')
    .replace(/<path[^/]*d="M0 0h24v24H0V0zm0 0h24v24H0V0z" \/>/g, '');
  
  const sizeMatch = svgPath.match(/^.*_([0-9]+)px.svg$/);
  const size = sizeMatch ? Number(sizeMatch[1]) : null;

  if (size !== null && size !== 24) {
    const scale = Math.round((24 / size) * 100) / 100; // Keep a maximum of 2 decimals
    paths = paths.replace('clipPath="url(#b)" ', '');
    paths = paths.replace(/<path /g, `<path transform="scale(${scale}, ${scale})" `);
  }

  noises.forEach(([search, replace]) => {
    if (paths.indexOf(search) !== -1) {
      paths = paths.replace(search, replace);
    }
  });

  // Add a fragment when necessary.
  if ((paths.match(/\/>/g) || []).length > 1) {
    paths = `<React.Fragment>${paths}</React.Fragment>`;
  }

  return paths;
}

async function getComponentContent(file, name, template) {
  const svgCode = await fs.readFile(file, "utf8");
  const paths = await cleanPaths(file, svgCode);
  return Mustache.render(template, {
    paths,
    componentName: name,
  });
}

async function writeIconComponent(write, name, file, template) {
  // write icon component
  const componentContent = await getComponentContent(file, name, template);
  await write(path.resolve(DIST, `${name}.js`), componentContent);
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
    const template = await fs.readFile(path.resolve(__dirname, 'templateEvaIcon.js'), {
      encoding: 'utf8',
    });
    for (const file of files) {
      const name = getComponentName(file);
      if (exists.has(name)) {
        continue;
      } else {
        exists.add(name);
        await writeIconComponent(write, name, file, template);
        indexStr = addContentToIndexFile(indexStr, name);
        exists.add(file);
        console.log(`created ${name}`);
      }
    }
  }
  await write(path.resolve(DIST, `index.js`), indexStr);
}

async function main() {
  try {
    for (const icon of icons) {
      await writeIconModule(icon);
    }
    console.log("done");
  } catch (e) {
    console.error(e);
  }
}
main();
