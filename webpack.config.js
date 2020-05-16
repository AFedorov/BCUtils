const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // mode: 'production',
    mode: 'development',
    entry: {
        lpp: './lib/lpp.js',
        lpx: './lib/lpx.js',
        ba:  './lib/BuildDevAccAddrADM.js',
        sa:  './lib/SearchADM.js',
        maa: './lib/MakeAcquiringAgreement.js'
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // new CleanWebpackPlugin(),
    ],
    target: 'node'
};
