const path = require('path');
const webpack = require('webpack');
const getExtensionInfo = require('webextension-toolbox/src/utils/get-extension-info');

const { version, name, description } = getExtensionInfo('app');

const metadata = [
    `// ==UserScript==\n`,
    `// @name         ${name}\n`,
    `// @namespace    http://tampermonkey.net/\n`,
    `// @version      ${version}\n`,
    `// @description  ${description}\n`,
    `// @author       Mobile Jazz\n`,
    `// @match        *://*.harvestapp.com/reports/detailed*\n`,
    `// @grant        none\n`,
    `// ==/UserScript==`,
];

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, '../app/scripts/background.js'),
    output: {
        path: path.resolve(__dirname, './build'),
        filename: `${name}.user.js`
    },
    module: {
        rules: [
            {
                use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ],
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
                banner: metadata.join(''),
                raw: false,
                entryOnly: false
            }

        )
    ]
};
