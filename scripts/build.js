const cheerio = require("cheerio");
const glob = require("glob-promise");
const path = require("path");
const fs = require("fs-extra");
const camelcase = require("camelcase");

const { icons } = require("../src/icons");

// file path
const rootDir = path.resolve(__dirname, "../");
const DIST = path.resolve(rootDir, ".");
const LIB = path.resolve(rootDir, "./lib");

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
          default:
            obj[newName] = attribs[name];
            break;
        }
        return obj;
      }, {});

  // convert to [ { tag: 'path', attr: { d: 'M436 160c6.6 ...', ... }, child: { ... } } ]
  const elementToTree = (/** @type {Cheerio} */ element) =>
    element
      .filter((_, e) => e.tagName && !["style"].includes(e.tagName))
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
function generateIconsEntry(iconId, type = "module") {
  switch (type) {
    case "module":
      return `export * from './${iconId}';\n`;
    case "dts":
      return `export * from './${iconId}';\n`;
  }
}

async function dirInit() {
  await createDirIfNotExist(DIST);
  await createDirIfNotExist(path.resolve(LIB, "esm"));
  await createDirIfNotExist(path.resolve(LIB, "cjs"));

  const write = (filePath, str) =>
    fs.writeFile(path.resolve(DIST, ...filePath), str, "utf8");

  const initFiles = ["index.d.ts", "all.js", "all.d.ts"];

  for (const icon of icons) {
    await createDirIfNotExist(path.resolve(DIST, icon.id));

    await write(
      [icon.id, "index.js"],
      "// THIS FILE IS AUTO GENERATED\nvar GenIcon = require('../lib').GenIcon\n"
    );
    await write(
      [icon.id, "index.esm.js"],
      "// THIS FILE IS AUTO GENERATED\nimport { GenIcon } from '../lib';\n"
    );
    await write(
      [icon.id, "index.d.ts"],
      "import { IconTree, IconType } from '../lib'\n// THIS FILE IS AUTO GENERATED\n"
    );
    await write(
      [icon.id, "package.json"],
      JSON.stringify(
        {
          sideEffects: false,
          module: "./index.esm.js"
        },
        null,
        2
      ) + "\n"
    );
  }

  for (const file of initFiles) {
    await write([file], "// THIS FILE IS AUTO GENERATED\n");
  }
}
async function writeIconModule(icon) {
  const appendFile = fs.appendFile;
  const exists = new Set(); // for remove duplicate
  for (const content of icon.contents) {
    const files = await getIconFiles(content);

    const entryModule = generateIconsEntry(icon.id, "module");
    await appendFile(path.resolve(DIST, "all.js"), entryModule, "utf8");
    const entryDts = generateIconsEntry(icon.id, "dts");
    await appendFile(path.resolve(DIST, "all.d.ts"), entryDts, "utf8");

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
      await appendFile(
        path.resolve(DIST, icon.id, "index.esm.js"),
        modRes,
        "utf8"
      );
      const comRes = generateIconRow(icon, name, iconData, "common", rawName);
      await appendFile(path.resolve(DIST, icon.id, "index.js"), comRes, "utf8");
      const dtsRes = generateIconRow(icon, name, iconData, "dts", rawName);
      await appendFile(
        path.resolve(DIST, icon.id, "index.d.ts"),
        dtsRes,
        "utf8"
      );

      exists.add(file);
    }
  }
}

async function writeIconsManifest() {
  const writeFile = fs.writeFile;
  const copyFile = fs.copy;

  const writeObj = icons.map(icon => ({
    id: icon.id,
    name: icon.name,
    projectUrl: icon.projectUrl,
    license: icon.license,
    licenseUrl: icon.licenseUrl
  }));
  const manifest = JSON.stringify(writeObj, null, 2);
  await writeFile(
    path.resolve(LIB, "esm", "iconsManifest.js"),
    `export const IconsManifest = ${manifest}`,
    "utf8"
  );
  await writeFile(
    path.resolve(LIB, "cjs", "iconsManifest.js"),
    `module.exports.IconsManifest = ${manifest}`,
    "utf8"
  );
  await copyFile(
    "src/iconsManifest.d.ts",
    path.resolve(LIB, "esm", "iconsManifest.d.ts")
  );
  await copyFile(
    "src/iconsManifest.d.ts",
    path.resolve(LIB, "cjs", "iconsManifest.d.ts")
  );
  await copyFile("src/package.json", path.resolve(LIB, "package.json"));
}

async function main() {
  try {
    await dirInit();
    await writeIconsManifest();
    for (const icon of icons) {
      await writeIconModule(icon);
    }
    console.log("done");
  } catch (e) {
    console.error(e);
  }
}
main();
