import FetchFile from '../components/js/FetchFile'

const headers = new Headers();
headers.append('Content-Type', 'text/html');

const catchHeader = new FetchFile('/transfer/assets/piezas/trx-headerfooter.htm', {
		method: 'GET',
		mode: 'cors',
		headers: headers,
		cache: 'default',
		credentials: 'same-origin'
    });

const promiseHeader = catchHeader.loadFile();


const responseHeader = promiseHeader.then( response => {
        if(response.ok){
            return response.text();
        }else{
            console.log('Error de archivo')
        }
    }).then( html => {
        let 
            parser = new DOMParser(),
            hf = parser.parseFromString(html, 'text/html');
            return {
                header : hf.querySelector('header').innerHTML,
                footer : hf.querySelector('footer').innerHTML
            }
    }).then( hf => {
        let 
            hr = document.querySelector('#trx-header-main'),
			fr = document.querySelector('#trx-footer-main');
        
		hr.setAttribute('m-menu-fixed',false);
		hr.setAttribute('m-menu-open', false);
			
		hr.classList.add('trx-header');
        fr.classList.add('trx-footer');
    
        hr.innerHTML = hf.header;
		fr.innerHTML = hf.footer;
		
		let navLinks = hr.querySelectorAll('nav .list-item > .cbx-link');

		for(let i=0; i<navLinks.length; i++){
			if(navLinks[i].getAttribute('href') == window.location.pathname){
				navLinks[i].setAttribute('m-active', true);
				break;
			}
		}
    }).catch(error =>{
        console.log(`Error en el archivo de tipo ${error.message}`);
    })

export {responseHeader}