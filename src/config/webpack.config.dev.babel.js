import path from 'path'
import postcssPresetEnv from 'postcss-preset-env'

const development = {
	mode: 'development',
	watch: true,
	entry: {
		'trx-components-transfer' : ['./src/Transfer/components/index','./src/Transfer/components/js/cbx-components'],
		'trx-header-footer-transfer' : ['es6-promise','whatwg-fetch','./src/Transfer/header-footer/index'],
		'trx-template-home' : './src/Transfer/templates/home',
		'trx-template-services' : './src/Transfer/templates/services'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../../assets/js/')
	},
	module: {
		rules : [
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
						loader : 'style-loader'
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
									precision: 3
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
	devServer: {
		hot: true, 
		compress: true,
		port: 9000,
		open: true,
		publicPath: '/assets/'
	}
}

export default development;