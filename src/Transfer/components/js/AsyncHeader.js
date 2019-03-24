export default class AsyncHeader{
    constructor(path, config){
        this.path = path;
        this.config = config;
        this.promise = null;
    }

    async asyncLoadFile(){
        return fetch(this.path, this.config).then( response => {
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
            
            hr.classList.add('trx-header');
            hr.setAttribute('m-menu-fixed',false);
            hr.setAttribute('m-menu-open', false);
            
            fr.classList.add('trx-footer');
        
            document.querySelector('#trx-header-main').innerHTML = hf.header;
            document.querySelector('#trx-footer-main').innerHTML = hf.footer;
        }).catch(error =>{
            console.log(`Error en el archivo de tipo ${error.message}`);
        })
    }
}