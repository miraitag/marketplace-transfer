import {cbxOverlay} from './cbx-components'

export default class Header {
	constructor(){
		this.header = document.querySelector('.trx-header');
		this.firstSection = document.querySelector('section:first-of-type');
		this.buttonOpen = document.querySelector('.trx-header nav > button:first-child');
		this.buttonClose = document.querySelector('.trx-header > button');
	}

	init(){
		this.scrollFixed();
		this.resizeWindow();
		this.menuActions();
	}

	menuActions(){
		this.buttonOpen.addEventListener('click', (e) =>{
			this.header.setAttribute('m-menu-open','true');
			cbxOverlay.build();
		});

		this.buttonClose.addEventListener('click', (e) => {
			this.header.setAttribute('m-menu-open','false');
			cbxOverlay.destroy();
		});
	}

	scrollFixed(){
		window.addEventListener('scroll', (e) => {
			if(window.matchMedia('(max-width:767px)').matches){
				if(window.scrollY - this.header.offsetHeight >= this.firstSection.offsetHeight){
					this.header.setAttribute('m-menu-fixed','true');
				}else{
					this.header.setAttribute('m-menu-fixed','false');
				}
			}
		});
	}

	resizeWindow(){
		window.addEventListener('resize', (e)=>{
			if(window.matchMedia('(min-width:768px)').matches && (this.header.getAttribute('m-menu-fixed') == 'true' || this.header.getAttribute('m-menu-open') == 'true' ) ){
				this.header.setAttribute('m-menu-fixed', 'false');
				this.header.setAttribute('m-menu-open', 'false');
				cbxOverlay.destroy();
			}
		});
	}
}