const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')


module.exports = {
    context:path.resolve(__dirname,'src'),
    mode:'development',
    entry: {
        main:'./index.js',
        // analytics:'./analytics.js'
    },
    output: {
        filename: "[name].js",
        path:path.resolve(__dirname,'dist')
    },
    devServer:{
    port:4200
    },
    plugins: [
        new HTMLWebpackPlugin({
            template:"./index.html"
        }),
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename:'[name].css'
        }),
        new CopyPlugin({
            patterns:[{
                from: path.resolve(__dirname, 'src/svg'),
                to: path.resolve(__dirname, 'dist/svg')
            }]
        })
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                    options:{},
                },'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                    options:{},
                },'css-loader',
                    'less-loader']
            },
            {
                test:/\.s[ac]ss$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                    options:{
                        name:'styles/[name].[ext]',
                        context:''
                    }
                },'css-loader',
                    'sass-loader']
            },
            {
                test:/\.(png|jpg|svg|gif)$/,
                use:[{
                    loader: 'file-loader',
                    options:{
                        name:'pics/[name].[ext]',
                        context:''
                    }
                }]
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'fonts/[name].[ext]',
                        context:''
                    }
                }]
            }
        ]
    }
}

