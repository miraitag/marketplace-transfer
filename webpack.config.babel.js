import development from  './src/config/webpack.config.dev.babel'
import production from  './src/config/webpack.config.prod.babel'

export default (env, args) => {
	if( args.mode == 'production'){
		return production
	}else{
		console.log('entre a develop');
		return development
	}
}