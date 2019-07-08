// shared config (dev and prod)
const {resolve} = require('path');
const {DefinePlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {GenerateSW} = require("workbox-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');

const styleLoaders = [
    'style-loader',
    {loader: 'css-loader', options: {importLoaders: 1}},
];
const forkTs = new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
});

const root = resolve(__dirname, '..');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    context: root,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: true,
                        transpileOnly: true,
                    }
                }],
            },
            {
                test: /\.css$/,
                use: styleLoaders,
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    ...styleLoaders,
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                ],
            },
            {
                test: /\.(svg|txt|webmanifest)$/,
                use: 'raw-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
                loader: 'url-loader?name=[name].[ext]'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html.ejs',}),
        forkTs,
        new DefinePlugin({
            'process.env.PUBLIC_URL': JSON.stringify('')
        }),
        new GenerateSW({
            clientsClaim: true,
            exclude: [/\.map$/, /asset-manifest\.json$/],
            importWorkboxFrom: 'cdn',
            navigateFallback: '/index.html',
            navigateFallbackBlacklist: [
                // Exclude URLs starting with /_, as they're likely an API call
                new RegExp('^/_'),
                // Exclude URLs containing a dot, as they're likely a resource in
                // public/ and not a SPA route
                new RegExp('/[^/]+\\.[^/]+$'),
            ],
            skipWaiting: true,
        }),
        new WebpackPwaManifest({
            name: 'Giraffe',
            short_name: 'Giraffe',
            description: 'Giraffe - Simple Imgur client',
            background_color: '#ffffff',
            theme_color: '#13809b',
            icons: [
                {
                    src: resolve(root, 'src/assets/favicon/android-chrome-256x256.png'),
                    sizes: [64, 192, 512] // multiple sizes
                },
            ]
        }),
    ],
    performance: {
        hints: false,
    },
};
