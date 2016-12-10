var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var isProd = process.env.NODE_ENV === 'production';

var BUILD_DIR = isProd ? path.resolve(__dirname, 'static') : path.resolve(__dirname, 'build');
console.log(process.env.NODE_ENV);

var plugins = [
    // set NODE_ENV for client side too
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'PORT': JSON.stringify(process.env.PORT) || 3000
        }
    }),
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

// If in production: remove warnings from Uglify
if (isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = {
    devtool: !isProd && 'inline-source-maps', // if NODE_ENV is not 'production', use '(inline-)source-map' as dev-tool (not optimized for production - great for devving). Otherwise save significant bytes
    entry: !isProd ? [
        'webpack-hot-middleware/client',
        './client/index.jsx'
    ] : './client/index.jsx',
    output: {
        path: BUILD_DIR,
        publicPath: isProd ? '/static/' : '/build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/,
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'sass?precision=8'] // bootstrap sass requires number precision set to 8 (default 5)

        }]
    },
    postcss: function() {
      return [autoprefixer];
    },
    resolve: ['', '.js', '.jsx'],
    plugins: plugins
};
