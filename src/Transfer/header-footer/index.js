import '../../../components/molecules/trx-header/style.pcss'
import '../../../components/molecules/trx-footer/style.pcss'

import Header from '../components/js/Header'
import { responseHeader } from './asyncHeader';


responseHeader.then(()=>{
	console.log('Cargo el Header-Footer correctamente');
	new Header().init();
})


//import AsyncHeader from '../components/js/AsyncHeader'

/* const headers = new Headers();
headers.append('Content-Type', 'text/html');

const async = new AsyncHeader('/transfer/assets/piezas/trx-headerfooter.htm', {
		method: 'GET',
		mode: 'cors',
		headers: headers,
		cache: 'default',
		credentials: 'same-origin' 
	});

const hf = async.asyncLoadFile();

hf.then(()=>{
	console.log('Cargo el Header-Footer correctamente');
	new Header().init();
}); */