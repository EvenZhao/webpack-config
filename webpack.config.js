const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const pathResolve = (relativePath) => {
    return path.join(__dirname, relativePath);
}

const postCssConfig = {
	loader: 'postcss-loader',
	options: {
		plugins: [
			/* eslint-disable */
			require('postcss-preset-env')(),
			/* eslint-enable */
		],
	},
};

module.exports = {
    entry:['@babel/polyfill', './src/index.js'],
    output:{
        path: pathResolve('./dist'),
        filename: 'index.js',
        // publicPath: './',
    },
    module: {
        rules: [
          { test: /\.js|jsx$/, use: 'babel-loader' },
          {
            test:/.css$/,
            use:[
                MiniCssExtractPlugin.loader,//文件指纹即CSShash与style.loader相互斥
                { loader: 'css-loader', options: { importLoaders: 3 } },
                postCssConfig,
            ]
        },
        ]
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: pathResolve('./index.html'),
        }),
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css'
        }),
    ],
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        contentBase: './dist',
        publicPath: './'
    }

}