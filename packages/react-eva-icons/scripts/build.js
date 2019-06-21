// const cheerio = require("cheerio");
const glob = require("glob-promise");
const path = require("path");
const fs = require("fs-extra");
const camelcase = require("camelcase");
import svgr from '@svgr/core';

const { icons } = require("../icons");

// file path
const rootDir = path.resolve(__dirname, "../src");
const DIST = path.resolve(rootDir, ".");

// logic

async function getIconFiles(content) {
  return glob(content.files);
}

async function getSvgStr(file, name) {
  const svgCode = await fs.readFile(file, "utf8");
  const jsxCode = await svgr(svgCode, {
    plugins: ['@svgr/plugin-svgo'],
    svgoConfig: {
      plugins: [{
        removeHiddenElems: false
      }, {
        removeEmptyContainers: true
      }, {
        removeAttrs: {attrs: '(class|id|data-name)'},
      }, {
        removeStyleElement: true
      }]
    }
  }, {
    componentName: name
  });
  return jsxCode
    .replace(/<svg.*?>/, '<React.Fragment>')
    .replace(/<\/svg>/, '</React.Fragment>')
    .replace(/ fill="#231f20"/g, '')
    
}

async function writeIconComponent(write, name, file) {
  // write icon component
  const iconData = await getSvgStr(file, name);
  const fileContent = `import React from 'react';
import createEvaIcon from './utils/createEvaIcon';

export default createEvaIcon(
  ${iconData}
, '${name}');
`;
  await write(path.resolve(DIST, `${name}.js`), fileContent);
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
