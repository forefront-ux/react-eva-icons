const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

const rewriteIcons = (svgType, filename) => {
    const source = path.resolve(getPath('source', svgType), filename);
    const target = path.resolve(getPath('target', svgType), filename);
    fs.readFile(source).then(result => {
        const $ = cheerio.load(result);
        $('svg').attr('aria-hidden', 'true');
        fs.writeFile(target, $.html('svg'));
    });
}

const getPath = (pathType, svgType) => {
    if (pathType === 'source') {
        return path.resolve(__dirname, `../eva-icons/package/icons/${svgType}/svg`);
    } else if (pathType === 'target') {
        return path.resolve(__dirname, `../src/icons/${svgType}`);
    }
    return false;
}

const getSourceFiles = type => {
    const source = getPath('source', type);
    return fs.readdir(source);
}

const main = () => {
    const types = ['fill', 'outline'];
    types.forEach(type => {
        getSourceFiles(type).then(files => {
            files.forEach(file => {
                rewriteIcons(type, file);
            });
        }).catch(err => {
            console.log(err);
        });
    });
}

main();