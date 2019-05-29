const cheerio = require("cheerio");
const glob = require("glob-promise");
const path = require("path");
const fs = require("fs-extra");
const camelcase = require("camelcase");

const { icons } = require("../src/icons");

// file path
const rootDir = path.resolve(__dirname, "../build");
const DIST = path.resolve(rootDir, ".");
const LIB = path.resolve(rootDir, "lib");

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
async function convertIconData(svg) {
  const $svg = cheerio.load(svg, { xmlMode: true })("svg");

  // filter/convert attributes
  // 1. remove class attr
  // 2. convert to camelcase ex: fill-opacity => fillOpacity
  const attrConverter = (
    /** @type {{[key: string]: string}} */ attribs,
    /** @type string */ tagName
  ) =>
    attribs &&
    Object.keys(attribs)
      .filter(
        name =>
          ![
            "class",
            ...(tagName === "svg" ? ["xmlns", "xmlns:xlink", "xml:space", "width", "height"] : []) // if tagName is svg remove size attributes
          ].includes(name)
      )
      .reduce((obj, name) => {
        const newName = camelcase(name);
        switch (newName) {
          case "fill":
            if (attribs[name] === "none") {
              obj[newName] = attribs[name];
            }
            break;
          case "dataName":
              obj['dataname'] = attribs[name];
              break;
          case "height":
          case "points":
              obj[newName] = attribs[name];
              if (['24', '24 24 0 24 0 0', '0 0 24 0 24 24 0 24'].includes(obj[newName])) {
                obj["opacity"] = "0";
              }
              break;
          default:
            obj[newName] = attribs[name];
            break;
        }
        return obj;
      }, {});

  // convert to [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]
  const elementToTree = (/** @type {Cheerio} */ element) =>
    element
      .filter((_, e) => e.tagName && !["style", "defs", "title"].includes(e.tagName))
      .map((_, e) => ({
        tag: e.tagName,
        attr: attrConverter(e.attribs, e.tagName),
        child:
          e.children && e.children.length
            ? elementToTree(cheerio(e.children))
            : undefined
      }))
      .get();

  const tree = elementToTree($svg);
  return tree[0]; // like: [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]
}
function generateIconRow(icon, formattedName, iconData, type = "module", rawName) {
  switch (type) {
    case "module":
      return (
        `export var ${formattedName} = function (props) {\n` +
        `  return GenIcon(${JSON.stringify(iconData)})("${rawName}", props);\n` +
        `};\n` +
        `${formattedName}.displayName = "${formattedName}";\n`
      );
    case "common":
      return (
        `module.exports.${formattedName} = function (props) {\n` +
        `  return GenIcon(${JSON.stringify(iconData)})("${rawName}", props);\n` +
        `};\n` +
        `module.exports.${formattedName}.displayName = "${formattedName}";\n`
      );
    case "dts":
      return `export declare const ${formattedName}: IconType;\n`;
  }
}

async function dirInit() {
  await createDirIfNotExist(DIST);
  await createDirIfNotExist(path.resolve(LIB, "esm"));
  await createDirIfNotExist(path.resolve(LIB, "cjs"));
  await fs.copyFile(
    path.resolve(__dirname, "..", "package.json"),
    path.resolve(DIST, "package.json")
  );

  const write = (filePath, str) =>
    fs.writeFile(path.resolve(DIST, ...filePath), str, "utf8");

  await write(
    ["index.js"],
    "// THIS FILE IS AUTO GENERATED\nvar GenIcon = require('./lib').GenIcon\n"
  );
  await write(
    ["index.esm.js"],
    "// THIS FILE IS AUTO GENERATED\nimport { GenIcon } from './lib';\n"
  );
  await write(
    ["index.d.ts"],
    "import { IconTree, IconType } from './lib'\n// THIS FILE IS AUTO GENERATED\n"
  );
  await write(
    ["lib", "package.json"],
    JSON.stringify({
      sideEffects: false,
      module: "./esm/index.js",
      main: "./cjs/index.js"
    }, null, 2) + "\n"
  );
}
async function writeIconModule(icon) {
  const appendFile = fs.appendFile;
  const exists = new Set(); // for remove duplicate
  for (const content of icon.contents) {
    const files = await getIconFiles(content);

    for (const file of files) {
      const svgStr = await fs.readFile(file, "utf8");
      const iconData = await convertIconData(svgStr);

      const rawName = path.basename(file, path.extname(file));
      const pascalName = camelcase(rawName, { pascalCase: true });
      const name =
        (content.formatter && content.formatter(pascalName)) || pascalName;
      if (exists.has(name)) continue;
      exists.add(name);

      // write like: module/fa/index.esm.js
      const modRes = generateIconRow(icon, name, iconData, "module", rawName);
      await appendFile(path.resolve(DIST, "index.esm.js"), modRes, "utf8");
      const comRes = generateIconRow(icon, name, iconData, "common", rawName);
      await appendFile(path.resolve(DIST, "index.js"), comRes, "utf8");
      const dtsRes = generateIconRow(icon, name, iconData, "dts", rawName);
      await appendFile(path.resolve(DIST, "index.d.ts"), dtsRes, "utf8");

      exists.add(file);
    }
  }
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
