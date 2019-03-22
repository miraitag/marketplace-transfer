import path from 'path'
import postcssPresetEnv from 'postcss-preset-env'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import MinifyPlugin from 'babel-minify-webpack-plugin'

console.log(__dirname);
export default (env, args) => {
    return {
		mode: args.mode == 'production' ? 'production' : 'development',
        watch: true,
        entry: {
            'trx-components-transfer' : ['./src/Transfer/components/index','./src/Transfer/components/js/cbx-components'],
            'trx-header-footer-transfer' : './src/Transfer/header-footer/index',
            'trx-templates-home' : './src/Transfer/templates/home',
            'trx-templates-services' : './src/Transfer/templates/home'
        },
        output: {
            filename: '[name].bundle.js',
			path: `${__dirname}/assets/js`
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude:[
						`${__dirname}/node_modules/`
                    ],
                    loader: 'babel-loader'
                },{
                    test: /\.(pcss|css)$/,
                    use: [ 
                        {
							loader : args.mode == 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
                        },{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },{
                            loader: 'postcss-loader',
                            options: {
                                indent: 'postcss',
                                parser: 'postcss',
                                plugins : () => [
                                    require('postcss-import')(),
                                    require('postcss-mixins')(),
                                    require('postcss-conditionals')(),
                                    require('postcss-calc')({
                                        precision: 2
                                    }),
                                    require('postcss-nested-props')(),
                                    postcssPresetEnv({
                                        stage: 1,
                                        features: {
                                            'nesting-rules': true,
                                            'custom-media-queries': true,
                                            'custom-properties': true,
                                            ':not-pseudo-class': true,
                                            ':matches-pseudo-class': true,
                                            'media-query-ranges': true
                                        },
                                        browsers: 'IE 11',
                                        autoprefixer: {
                                            grid: true
                                        }
                                    }),
                                    require('cssnano')()
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin()
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '../css/[name].min.css',
                chunkFilename: '[id].css'
			}),
			new MinifyPlugin()
        ]
    }
}