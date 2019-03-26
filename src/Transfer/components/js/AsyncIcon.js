import FetchFile from './FetchFile'

export default class AsyncIcon extends FetchFile{
    constructor(name, path = '/transfer/assets/piezas/svg.htm', method){
        this.name = name;
        this.path = path;
        this.method = method;
    }

    catchCoreFile(){
        super.loadFile(this.path, this.method).then(response => {
            if(response.ok){
                return response.text();
            }
        }).then( html => {
            let
                parser = new DOMParser();
                svgHtml = parser.parseFromString(html, 'text/html'),
                child = document.querySelector(`i.${this.name}`),
                parent = document.querySelector(`i.${this.name}`).parentNode,
                svgIcon = svg.querySelector(`[m-name="${this.name}"]}`),
                replace = parent.replaceChild(child, svgIcon);
        }).catch( error =>{
            console.log(`Hubo un error al cargar el archivo ${error.message}`)
        })
    }
}