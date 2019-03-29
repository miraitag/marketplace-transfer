import FetchFile from './FetchFile'

export default class AsyncIcon extends FetchFile{
    init(){
        this.loadFile(this.path, this.method).then(response => {
            if(response.ok){
                return response.text();
            }
        }).then( html => {
            let
                parser = new DOMParser(),
				svgHtml = parser.parseFromString(html, 'text/html');
				this.replaceIcons(svgHtml);
        }).catch( error =>{
            console.log(`Hubo un error al cargar el archivo ${error.message}`)
        })
	}
	
	replaceIcons(svgHtml){
		const icons = document.querySelectorAll('i[m-icon]');

		for(let i=0; i<icons.length; i++){
			let 
				cloneSvgHtml = svgHtml.cloneNode(true),
				iconSvgHtml = cloneSvgHtml.querySelector(`[m-name="${icons[i].getAttribute('m-icon')}"]`),
				iconDocument = document.querySelector(`i[m-icon="${icons[i].getAttribute('m-icon')}"]`),
				attrs = {
					size: iconDocument.getAttribute('m-size') ? iconSvgHtml.setAttribute('m-size', iconDocument.getAttribute('m-size')) : false
				},
				parentIcon = iconDocument.parentNode;
				
			parentIcon.replaceChild(iconSvgHtml,iconDocument);
		}
	}
}