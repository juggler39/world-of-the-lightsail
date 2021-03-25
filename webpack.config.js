// ----------------------
// Modules
// ----------------------

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



// ----------------------
// Helpers
// ----------------------

function absPath (value) {
    return path.join(__dirname, value);
}



// ----------------------
// Config
// ----------------------

module.exports = {

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: 'raw-loader'
            }
        ]
    },

    devServer: {
        static: 'dist',
        compress: true,
        port: 49044
    },

    plugins: [
        new webpack.DefinePlugin({
            NS: JSON.stringify('http://www.w3.org/2000/svg')
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        })
    ],

    resolve: {
        alias: {
            '@': absPath('src')
        }
    },

    entry: {
        '2d': absPath('src/2d'),
        '3d': absPath('src/3d')
    },

    output: {
        filename: 'scripts/[name].js'
    },

    devtool: 'source-map'

};
