// next.config.js
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const withPlugins = require("next-compose-plugins")

module.exports = withPlugins([withCSS, withLess], {
    cssModules: false
});