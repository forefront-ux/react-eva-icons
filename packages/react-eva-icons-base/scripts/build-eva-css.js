const fs = require('fs-extra');
const path = require('path');

const prepare = function () {
    clearSubmodule();
    fs.copySync(
        path.resolve(__dirname, '../src/webpack.evacss.config.js'),
        path.resolve(__dirname, '../icons/eva-icons/webpack.evacss.config.js')
    );
    console.log('copy webpack.evacss.config.js success!');
};

const moveGeneratedCssFile = function() {
    fs.copySync(
        path.resolve(__dirname, '../icons/eva-icons/package-build/eva.css'),
        path.resolve(__dirname, '../build/index.css')
    );
    console.log('generate eva css success!');
}

const clearSubmodule = function() {
    const packageBuildDirectory = path.resolve(__dirname, '../icons/eva-icons/package-build')
    fs.emptyDirSync(packageBuildDirectory);
    fs.rmdirSync(packageBuildDirectory);
    console.log('rmdir icons/eva-icons/package-build success!');
}

const post = function() {
    moveGeneratedCssFile();
    fs.removeSync(path.resolve(__dirname, '../icons/eva-icons/webpack.evacss.config.js'));
    console.log('rm icons/eva-icons/webpack.evacss.config.js success!');
}

const actions = {
    prepare,
    post
};

const main = () => {
    const action = process.argv[2];
    if (!action) {
        throw 'Please set an action, [prepare|post]';
    }
    actions[action]();
}

main();
