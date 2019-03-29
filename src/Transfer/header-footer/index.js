import Header from '../components/js/Header'
import AsyncIcon from '../components/js/AsyncIcon'
import { responseHeader } from './asyncHeader'

import '../../../components/molecules/trx-header/style.pcss'
import '../../../components/molecules/trx-footer/style.pcss'

const headers = new Headers();
headers.append('Content-Type', 'text/html');

const asyncIcons = new AsyncIcon('/transfer/assets/piezas/svg.htm', {
	method: 'GET',
	mode: 'cors',
	headers: headers,
	cache: 'default',
	credentials: 'same-origin' 
});

responseHeader.then(()=>{
	console.log('Cargo el Header-Footer correctamente');
	new Header().init();
	asyncIcons.init();
})