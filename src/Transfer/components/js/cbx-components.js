$.fn.extend({
	willSlick: function(args, options){
		this.args = args || null;
		this.options = options || {};
		this.component = this;
		this.type = this.args.type || "default";
		this.infinite = this.options.infinite || false;
		this.autoplay = this.options.autoplay || false;
		this.speed = this.options.speed || 700;
		this.autoplaySpeed = this.options.autoplaySpeed || 6000;
		this.slideToShow = this.options.slideToShow || 1;
		this.centerMode = this.options.centerMode || false;
		this.variableWidth = this.options.variableWidth || false;
		this.adaptiveHeight = this.options.adaptiveHeight || false;
		this.isLoad = false;
		this.hh = window.innerHeight;
		this.ww = window.innerWidth;
		this.optionsSlick ={
			"arrows": {
				arrows: true,
				dots: false,
				infinite: this.infinite,
				centerMode: this.centerMode,
				variableWidth: this.variableWidth,
				adaptiveHeight: this.adaptiveHeight,
				autoplay: this.autoplay,
				speed: this.speed,
				autoplaySpeed: this.autoplaySpeed,
				slideToShow : this.slideToShow
			},
			"dots": {
				arrows: false,
				dots: true,
				infinite: this.infinite,
				centerMode: this.centerMode,
				variableWidth: this.variableWidth,
				adaptiveHeight: this.adaptiveHeight,
				autoplay: this.autoplay,
				speed: this.speed,
				autoplaySpeed: this.autoplaySpeed,
				slideToShow : this.slideToShow
			}
		};
		this.init = function(){
			if(!this.args.length && typeof( this.args.query) != 'object'){
				this.set(this.args.query, this.args.type);
			}else if(typeof( this.args.query ) == 'object'){
				//if(this.args.query.length && typeof( this.args.query ) == 'object'){
					for( var i=0; i<this.args.query.length; i++ ){
						this.set(this.args.query[i], this.args.type);	
					}
				//}
			}else{
				for(var index in this.args){
					if(typeof( this.args ) == 'object' ){
						if( typeof( this.args[index].query ) == 'object' ){
							for( var i=0; i<this.args[index].query.length; i++ ){
								this.set(this.args[index].query[i], this.args[index].type);	
							}
						}else{
							this.set(this.args[index].query, this.args[index].type);
						}
					}
				}		
			}

			this.isLoad = false;
		};
		this.set = function(query,type){
			if(!this.isLoad){
				if( query == 'mobile' && window.matchMedia('(max-width:767px)').matches){
					this.load( type );
					this.isLoad = true;	
				}else if( query == 'portrait' && window.matchMedia('(min-width:767px) and (max-width:1023px)').matches){
					this.load( type );
					this.isLoad = true;	
				}else if( query == 'desktop' && window.matchMedia('(min-width:1024px) and (max-width:1279px)').matches){
					this.load( type );
					this.isLoad = true;	
				}else if( query == 'full' && window.matchMedia('(min-width:1280px) ').matches){
					this.load( type );
					this.isLoad = true;	
				}else if( query == 'all'){
					this.load( type );
					this.isLoad = true;	
				}else{
					this.destroy();
				}
			}
		};
		this.load = function(type){
			this.destroy();
			this.component.attr('m-slick', type);
			this.component.on('init', function(slick){
				//console.log(slick);
				$(slick.currentTarget).find('.slick-slide').css('height', $(slick.currentTarget).find('.slick-track').innerHeight());
			});
			this.slick( this.optionsSlick[type] );
		};
		this.resize = function(){
			var self = this;
			window.addEventListener('resize', function(){
				if(this.innerHeight != self.hh && this.innerWidth !== self.ww){
					self.init();
				}else{
					self.hh = this.innerHeight;
					self.ww = this.innerWidth;
				}
			});
		};
		this.destroy = function(){
			if(this.component.hasClass('slick-slider') ){
				this.component.find('.slick-slide').removeAttr('style');
				this.component.slick('unslick');
			}
		};
		this.get = function(){
			return this.component[0];
		};
		this.component.resize();
		this.init();
		return this;
	},
	userAgent: function(){
		this.html = this;
		this.browsers = {};
		this.currentBrowser = '';
		this.set = function(){
			this.browsers = {
				ie : navigator.userAgent.toLowerCase().match(/trident/ig) || false,
				android : navigator.userAgent.toLowerCase().match(/android/ig) || false,
				ff: navigator.userAgent.toLowerCase().match(/firefox/ig) || false,
				edge: navigator.userAgent.toLowerCase().match(/edge/ig) || false,
				iphone: navigator.userAgent.toLowerCase().match(/iphone/ig) || false,
				ipad: navigator.userAgent.toLowerCase().match(/ipad/ig) || false,
				chrome: navigator.userAgent.toLowerCase().match(/chrome/ig) || false,
				safari: navigator.userAgent.toLowerCase().match(/safari/ig) || false,
				mobile: navigator.userAgent.toLowerCase().match(/mobile/ig) || false
			};
		}
		this.onBrowser = function(){
			var browser ='';
			if( navigator.userAgent.indexOf(this.html.attr('m-browser')) == -1 || this.html.attr('m-browser') == undefined ){
				for( var bws in this.browsers ){
					if( this.browsers[bws] ){
						browser = bws+' '+ browser ;
						if(browser.match(/safari chrome/)){
							browser = browser.replace('safari','').trim();
						}
						this.html.attr('m-browser', browser.trim())
						this.currentBrowser = browser.trim();
					}
				}
			}
		};
		this.onResize = function(){
			var self = this;
			window.addEventListener('resize', function(){
				self.set();
				self.onBrowser();
			});
		};
		this.get = function(){
			return this.html.attr('m-browser') || undefined;
		};
		this.set();
		this.onBrowser();
		this.onResize();

		return this;
	},
	badgeApps:function(){
		this.app = this;
		this.validateUserAgent = function(){
			if( $('html').attr('m-browser') == undefined ){
				$('html').userAgent();	
			}
			
			this.onType();
			this.onWeb();
			this.onResize();
		};

		this.onType = function(){
			if($('html').attr('m-browser').match(/ipad|iphone/) != null && $('html').attr('m-browser').match(/ipad|iphone/).length ){
				this.app.find('[hidden]').removeAttr('hidden');
				this.app.find('[m-mody="google"]').attr('hidden','');
			}else if($('html').attr('m-browser').match(/android/) != null && $('html').attr('m-browser').match(/android/).length){
				this.app.find('[hidden]').removeAttr('hidden');
				this.app.find('[m-mody="apple"]').attr('hidden','');
			}
		}

		this.onWeb = function(){
			if($('html').attr('m-browser').match(/mobile/) == null && !this.app.find('[m-web]').length ){
				this.app.find('> [m-mody]').attr('hidden','');
			}else if($('html').attr('m-browser').match(/mobile/) == null && this.app.find('[m-web="true"]').length){
				this.app.find('[hidden]').removeAttr('hidden');
			}
		}
		
		this.onResize = function(){
			var self = this;
			window.addEventListener('resize', function(){
				self.onType();
				self.onWeb();
			});
		}

		this.validateUserAgent();

		return this;
	},
	tabs: function(callback){
		this.tabs = this;
		this.menu = this.children().eq(0) || false;
		this.items = this.children().eq(1) || false;
		this.currentActive = 0;
		this.targetActive = 0;
		this.currentTrigger = '';
		this.targetTrigger = '';
		this.currentItem = '';
		this.targetItem = '';

		if( !this.menu.length && !this.items.length ){
			return this;
		}

		this.init = function(){
			this.loadMenu();
			this.loadItems();
			this.onClick();
		};
		this.onClick = function(){
			var self = this;
			this.menu.children().on('click', function(e){
				e.preventDefault();
				if( $(this).attr('m-active') == 'false'){
					self.currentActive = self.menu.find('[m-active="true"]').index();
					self.currentTrigger = self.menu.find('[m-active="true"]');
					self.menu.find('[m-active="true"]').attr('m-active', 'false');
					$(this).attr('m-active', 'true');
					self.targetActive = self.menu.find('[m-active="true"]').index();
					self.targetTrigger = self.menu.find('[m-active="true"]');
					self.onVisible();
				}
			});
		};
		this.onVisible = function( current, target ){
			this.currentItem = this.items.find('[m-open="true"]');
			this.items.find('[m-open=true]').attr('m-open', 'false');
			this.items.find('[m-open]').eq( this.targetActive ).attr('m-open', 'true');
			this.targetItem = this.items.find('[m-open="true"]');
			if( typeof( callback ) == 'function'){
				callback( this.tabs, this.currentTrigger, this.targetTrigger, this.currentItem, this.targetItem  );
			}
			/* if( !this.items.find('[m-open]').eq( target ).hasClass('slick-slider')  ){
				this.items.find('[m-open]').eq( target ).attr('m-slick', 'only-dots-mobile');
				this.buildSlick( this.items.find('[m-open]').eq( target ) );
			} */
		};
		this.loadMenu = function(){
			this.menu.children().each( function(index, el){
				if( index == 0){
					$(el).attr('m-active','true')
				}else{
					$(el).attr('m-active', 'false')
				}
			})
		};
		this.loadItems = function(){
			this.items.children().each( function(index, el){
				if( index == 0){
					$(el).attr('m-open','true')
				}else{
					$(el).attr('m-open', 'false')
				}
			})
		};
		this.destroy = function(){
			this.menu.children().removeAttr('m-active');
			this.items.children().removeAttr('m-open');
		};
		this.get = function(){
			return this.tabs;
		};

		this.init();

		return this;
	},
	exitModal: function(){
		this.modal = this;
		this.json = {};
		this.buttonClose = $('.cbx-exit').find('> .cbx-icon');
		this.exit = $('.cbx-exit');
		this.cta = $('.cbx-exit').find('.exit-cta > .cbx-link');
		this.hh = window.innerHeight;
		this.ww = window.innerWidth;
		this.init = function(){
			this.build();
			this.close();
			this.resize();
			this.outerClick();
		};
		this.build = function(){
			var self = this;
			this.modal.on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				self.isJSON( $(this) );
				self.loadProps( self.json, e);
				self.setPosition(e);
			});
		};
		this.setPosition = function(event){
			var self = this;
			if( window.matchMedia('(min-width:1024px)').matches ){
					this.exit.css({
						left: event.pageX + 'px',
						top: event.pageY  + 'px'
					});
					var 
						offset = { Y: 0, X : 0 },
						exit = {
							height: $('.cbx-exit').innerHeight() + $('.cbx-exit .cbx-icon').innerHeight(),
							width: $('.cbx-exit').innerWidth() + $('.cbx-exit .cbx-icon').innerWidth()
						};
					if( (event.pageY + exit.height) > $('body').innerHeight()){
						offset.Y = $('body').innerHeight() - exit.height;
						self.exit.css({
							top: offset.Y + 'px',
							transform : 'translateX(-50%)'
						});
					}

					if( (event.pageX + exit.width) > $('body').innerWidth() ){
						offset.X =  $('body').innerWidth() - exit.width;
						self.exit.css({
							left: offset.X + 'px' ,
							transform : 'translateY(-50%)'
						});
					}
			}else{
				cbxOverlay.build();
			}
		};
		this.loadProps = function( json, e ){
			if( this.json.error == '' ){
				if( !json.condusef){
					this.set(this.json.extra, 'Estás saliendo de citibanamex.com para entrar al sitio de ' + this.json.sponsor, 'Entrarás a un sitio web ajeno a Citibanamex, el cual es responsable de sus propios contenidos y mantiene su política de privacidad y seguridad.', this.json.path )
				}else{
					this.set(this.json, 'Estás saliendo de citibanamex.com para entrar al sitio de ' + this.json.sponsor, 'Entrarás a un sitio web ajeno a Citibanamex, el cual es responsable de sus propios contenidos y mantiene su política de privacidad y seguridad.', this.json.path )
				}
			}else{
				this.set('Error de Sintaxis', this.json.error, '', '#' )
			}
		};
		this.set = function( first, second, third, path){
			if( first.condusef != true ){
				this.exit.find('.exit-description .cbx-legal:first-child').text( first );
				this.exit.find('.exit-description .cbx-legal:nth-child(2)').text( second );
				this.exit.find('.exit-description .cbx-legal:nth-child(3)').text( third );
			}else{
				this.exit.find('.exit-description .cbx-legal:first-child').html( '<span m-font="bold">Unidad Especializada de  Atención (UNE)</span> <br/> <span m-font="bold">Av. Insurgentes Sur no. 926, colonia Del Valle, delegación Benito Juárez, C.P. 03100, Ciudad de México.<span> <br/> Telefono: (55) 1226 4583 Email: une@citibanamex.com' );
				this.exit.find('.exit-description .cbx-legal:nth-child(2)').html( '<span m-font="bold">Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros (CONDUSEF) <br></span> Teléfono: (55) 5340 0999 Del Interior de la República sin costo: 01(800) 999 8080 www.gob.mx/condusef ' );
				this.exit.find('.exit-description .cbx-legal:nth-child(3)').html( '<span m-font="bold">El sitio de CONDUSEF es ajeno a Citibanamex, responsable de sus propios contenidos y mantiene su polí­tica de privacidad y seguridad.</span>' );
			}
			this.exit.find('.exit-cta > a').attr('href', path )
			this.exit.attr('m-visible', 'true');
		};
		this.close = function( el ){
			var self = this;
			var multipleClose = [this.buttonClose, this.cta];

			$.each(multipleClose, function(index, $el){
				$el.on('click', function(e){
					e.stopPropagation();
					self.destroy();
				});
			})
		};
		this.destroy = function(){
			this.exit.attr('m-visible', 'false').removeAttr('style')
			if( window.matchMedia('(max-width:768px)').matches ){
				cbxOverlay.destroy();
			}
		}
		this.isJSON = function( el ){
			try{
				this.json = JSON.parse(el.attr('m-exit'));
				this.json.error = '';
			}
			catch(error){
				this.json.error = 'El JSON esta mal configurado, revisar nuevamente';
			}
		};
		this.resize = function(){
			var self = this;
			window.addEventListener('resize', function(){
				if(this.innerHeight != self.hh && this.innerWidth !== self.ww){
					if(window.matchMedia('(min-width:1024px)').matches){
						self.currentBodyHeight = document.body.scrollHeight;
						self.currentBodyWidth = document.body.scrollWidth;
					}
	
					if( window.matchMedia('(min-width:1024px)').matches && self.exit.attr('m-visible') == 'true' ) {
						cbxOverlay.destroy();
						self.exit.attr('m-visible', 'false');
					}else{
						self.exit.attr('m-visible', 'false').removeAttr('style')
					}
				}else{
					self.hh = this.innerHeight;
					self.ww = this.innerWidth;
				}
			});
		};

		this.outerClick = function(){
			var self = this;
			window.addEventListener('click', function(e){
				if( self.exit.length && self.exit.attr('m-visible') == 'true' && !$(self.exit)[0].contains(e.target)) {
					self.destroy();
				}
			});
		}

		this.init();
		return this;
	},
	collapse: function(){
		this.collapse = this;
		this.menu = this.children().eq(0) || false;
		//this.menuItems = this.menu.children() || false;
		this.content = this.children().eq(1) || false;
		this.targetText = '';
		this.realText = '';
		
		if( !this.menu  && !this.content){
			return false;
		};

		this.init = function(){
			this.onClick();
		};

		this.onClick = function(){
			var self = this;
			this.menu.children().on('click', function(){
				self.targetText = $(this).attr('m-target');
				if( $(this).attr('m-current') == "true" ){
					$(this).attr('m-current', 'false'); 
					$(self.content[0]).find('[m-content='+self.targetText+']').attr('m-active', 'false');
				}else{
					$(self.menu[0]).find('[m-current="true"]').attr('m-current', 'false');
					$(this).attr('m-current', 'true');
					$(self.content[0]).find('[m-content]').attr('m-active', 'false');
					$(self.content[0]).find('[m-content='+self.targetText+']').attr('m-active', 'true');
				}
			});
		};

		this.get = function(){
			return this.collapse;
		}

		this.destroy = function(){
			this.menu.children().off('click');
			this.collapse.find('[m-active]').attr('m-active', 'false');
			this.collapse.find('[m-current]').attr('m-current', 'false');
		};

		this.init();

		return this;
	},
	dropDown: function(options, callback){  
		this.component = this;
		this.items = this.component.children();
		this.buttons = this.items.find('> [m-open]');
		this.options = options || {} ;
		this.type = this.options.type || 'all';
		this.open = this.options.open || false;
		this.toggle = this.options.toggle || false;
		this.animateTop = this.options.animateTop || false;
		this.callback = callback || function(){};
		this.hh = window.innerHeight;
		this.ww = window.innerWidth;
		this.init = function(){
			this.onResize();
			this.onType();
		}
		this.onClick = function(){
			var self = this;
			this.buttons.on('click', function(e){
				e.preventDefault();
				
				if(!self.toggle){
					if( $(this).attr('m-open') == 'true' ){
						$(this).attr('m-open','false');
					}else{
						$(this).attr('m-open','true');
					}
				}else{
					if(self.toggle){
						if( $(this).attr('m-open') == 'true' ){
							$(this).attr('m-open','false');
						}else{
							var 
								button = this,
								duration = parseFloat($(button).find('+ *').css('transition-duration'),10) * 1000;
							self.component.find('[m-open="true"]').attr('m-open','false');
							setTimeout(function() {
								$(button).attr('m-open','true');
							}, duration + 150 );
						}
					}
				}
				self.onAnimateTop( $(this) );

				if(self.callback){
					callback(self.component);
				}
			});

		}
		this.onAnimateTop = function( button ){
			if( this.animateTop){
				var headerHeight = 0;
				if($('.cbx-header').length){
					headerHeight = $('.cbx-header').outerHeight();
				}
				setTimeout(function(){
					$('body, html').animate({scrollTop: button.parent().offset().top - headerHeight}, 350);
				}, 700)
			}
		}
		this.onType = function(){
			if(typeof(this.type) == 'object'){
				for(var i = 0; i<this.type.length; i++){
					if(this.type[i] != 'all' && this.type[i] == this.onResolution() && this.type[i] != ''){
						this.onLoad( this.type[i])
						break;
					}else{
						this.destroy();
					}
				}
			}else{
				if(this.onResolution() == this.type){
					this.onLoad( this.type );
				}else{
					this.destroy();
				}
			}
		}
		this.onLoad = function(){
			if(this.buttons.attr('style')){
				this.buttons.removeAttr('style');
			}
			if(this.open){
				this.buttons.attr('m-open','false');
				this.buttons.eq(0).attr('m-open','true');
			}
			this.onClick();
		}
		this.onResolution = function(){
			if( this.type == 'all'){
				return 'all';
			}
			
			if(window.matchMedia('(max-width:767px)').matches){
				return 'mobile'
			}else if(window.matchMedia('(min-width:768px) and (max-width:1023px)').matches){
				return 'portrait'
			}else if(window.matchMedia('(min-width:1024px) and (max-width:1279px)').matches){
				return 'landscape'
			}else if(window.matchMedia('(min-width:1280px)').matches){
				return 'desktop'
			}
		}
		this.destroy = function(){
			this.buttons.off('click');
			this.buttons.attr('m-open','true');
			//this.buttons.css('pointer-events','none').attr('m-open','true');
		}
		this.onResize = function(){
			var self = this;
			window.addEventListener('resize', function(){
				if(this.innerHeight != self.hh && this.innerWidth !== self.ww){
					self.onType();
				}else{
					self.hh = this.innerHeight;
					self.ww = this.innerWidth;
					self.onType();
				}
			});
		}

		this.get = function(){
			return this.component;
		}

		this.init();
	},
	modal: function(){
		this.component = this;
		this.closeButton = $('.cbx-modal .close-modal');
		this.init = function(){
			this.build();
			this.close();
		}
		this.build = function(){
			this.component.on('click', function(e){
				e.stopPropagation();
				cbxOverlay.build();
				var target=$(this).attr('m-target');
				$(".cbx-modal[m-target="+target+"]").attr('m-open','true');
			});
		}
		this.close = function(){
			var self = this;
			this.closeButton.on('click',function(){
				self.destroy();
			});
		}
		this.destroy = function(){
			$(this).parents().find('.cbx-modal').attr('m-open', 'false');
			cbxOverlay.destroy();
		}
		this.get = function(){
			return this.component;
		}
		
		this.init();

		return this;
	},
	submenu: function(){
		this.component = this;
		this.btnOpen = this.component.find('.btn-open');
		this.btnClose = this.component.find('.btn-close');
		this.content = this.component.find('.submenu-content');
		this.init = function(){
			this.onOpen();
			this.onClose();
		}
		this.isOpen = function(){
			if (this.component.attr('m-open') == "false"){
				this.component.attr('m-open','true');
				if( window.matchMedia('(max-width:767px)').matches ){
					$('body').css('overflow','hidden');	
				}
			}else{
				this.component.attr('m-open','false');
				$('body').removeAttr('style');
			}
		}
		this.onOpen = function(){
			var self = this;
			this.btnOpen.on('click', function(){
				self.isOpen();
			});
		}
		this.onClose = function(){
			var self= this;
			this.btnClose.on('click',function(){
				self.isOpen();
			});
		}

		this.init()

		return this;
	}
});


$.fn.extend({
	form: function(elements){
		this.form = this;
		this.elements = elements || [];
		this.init = function(){
			for(var i=0; i<this.elements.length; i++){
				for(var j=0; j<this.elements[i].length; j++)
				this.onChange( this.elements[i][j]);
			}
		};
		this.onChange = function( field ){
			var type = field.className.split('-')[1];
			$(field).find(type).on('change', function(){
				if( $(this).val() != '' ) {
					$(this).parent($(field)).attr('m-empty', 'false');
				}else{
					$(this).parent($(field)).attr('m-empty', 'true');
				}
			})
		};
		this.get = function(){
			return this.select;
		};

		this.init();
		return this;
	}
});


var orientationBlock = {
	init: function(){
		this.onOrientation();
		this.onChange();
	},
	onChange: function(){
		window.addEventListener("orientationchange", function(even){
			orientationBlock.onOrientation();
		});
	},
	onOrientation: function(){
		if (window.matchMedia("(max-width:767px) and (orientation: landscape)").matches || ( ($('html[m-browser~=iphone]').length || $('html[m-browser~=android]').length ) && window.matchMedia('(min-width:768px) and (orientation:landscape)').matches) ) {
			$('html').addClass('landscape');
		}else{
			$('html').removeClass('landscape');
		}
	}
}

var cbxOverlay = {
	elements: [],
	build: function(){
		if(!$('.cbx-overlay').length){
			$('body').attr('m-overlay','true').append("<div class='cbx-overlay'></div>")
		}
	},
	destroy: function(){
		$('body').removeAttr('m-overlay');
		$('.cbx-overlay').remove()
	},
	outerClick: function(){
		window.addEventListener('click', function(e){ 
			if($('body').attr('m-overlay') && $('.cbx-header[m-open="false"]').length){
				if( $('.cbx-modal[m-open="true"]').length ){
					if( !$('.cbx-modal[m-open="true"] .cbx-modal-content')[0].contains(e.target) ){		
						modal.destroy();
						cbxOverlay.destroy();
					}
				}
	
				if( $('.cbx-exit[m-visible="true"]').length ){
					if( !$('.cbx-exit[m-visible="true"]')[0].contains(e.target) ){		
						exit.destroy();
						cbxOverlay.destroy();
					}
				}

				if( $('[m-dmp][m-open="true"]').length){
					if( !$('[m-dmp][m-open="true"]')[0].contains(e.target) ){	
						dmpOverlay.destroy();
						cbxOverlay.destroy();	
					}
				}
			}
			if( $('body').attr('m-overlay') && window.matchMedia('(min-width:768px) and (max-width:1024px) and (orientation:portrait)').matches &&  !$('.cbx-header')[0].contains(e.target) ){
				cbxOverlay.destroy();
			}
		})
	}
}

var dmpOverlay = {
    ww: $(window).innerWidth(),
    load: function(){
        dmpOverlay.build();
        dmpOverlay.resize();
    },
    build: function(){
        if(window.matchMedia('(min-width:768px)').matches){
            cbxOverlay.destroy();
        }else if (window.matchMedia('(max-width:767px)').matches){
            cbxOverlay.build();
        }
    },
    destroy: function(){
		$('.cbx-card[m-dmp]').remove();
    },
    resize: function(){
        window.addEventListener('resize', function(){
            if($('.cbx-card[m-dmp]').attr('m-open') && this.innerWidth != dmpOverlay.ww ){
                dmpOverlay.build();
            }
        });
    }
}

function disabledPhonesIE(){
	if( $('html[m-browser="ie"] .cbx-link[m-mody="phone"]').length ){
		$('.cbx-link[m-mody="phone"]').attr('disabled','disabled');
	}
}

var 
	ua = $('html'),
	formIO = $('[m-container=form]'),
	modal = $('[m-modal="cbx-modal"]'),
	submenu = $('.cbx-submenu[m-open]');

if( $('#trx-header-main').length && !$('#trx-header-main > nav').length){
	if( MutationObserver){
		var config = { attributes: true, childList: true, subtree: true };
		var callback = function(mutationsList, observer) {
			for(var mutation in mutationsList) {
				if (mutationsList[mutation].type == 'childList') {
					$('[m-exit]').exitModal();
					observer.disconnect();
				}
			}
		};
		var observer = new MutationObserver(callback);
		observer.observe(document.querySelector('#trx-header-main'), config)
	}else{
		var waitHeaderLoad = setInterval(function(){
			if( $('#trx-header-main > section').length){
				$('[m-exit]').exitModal();
				clearInterval(waitHeaderLoad);
			}
		});
	}
}else if( $('#trx-header-main').length && $('#trx-header-main > nav').length ){
	$('[m-exit]').exitModal();
}


$( document ).ready( function(){
	cbxOverlay.outerClick();
	ua.userAgent();
	orientationBlock.init();
	disabledPhonesIE();
	$('.cbx-apps').badgeApps();

	formIO.form([$('.cbx-select'), $('.cbx-input'), $('.cbx-textarea')]);
	/* if($('.cbx-exit').length){
		exit.exitModal();
	} */

	$('.cbx-faqs [m-drop-down]').dropDown({
		open:true,
		toggle:true
	})
	$('.cbx-steps [m-tabs]').tabs(function($el, currentButton, targetButton, currentItem, targetItem){
        currentButton.find('> .cbx-link').attr('m-active','false');
        targetButton.find('> .cbx-link').attr('m-active','true');
	});
	modal.modal();
	submenu.submenu();

	$('[m-tabs]:not(.cbx-steps)').each(function(i, el){
		$(el).tabs();
	});

	var heroCarousel = $('[m-container="hero"][m-mody="carousel"] .slick');
	heroCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){               
		var currentTitle = $('[m-container="hero"][m-mody="carousel"] .titles').children().eq(currentSlide)
		var nextTitle = $('[m-container="hero"][m-mody="carousel"] .titles').children().eq(nextSlide)

		currentTitle.attr('m-active', false);
		nextTitle.attr('m-active', true);
    });
	heroCarousel.on('afterChange', function(event, slick, currentSlide){               
		// insertar codico Marca ACME.
    });

	heroCarousel.willSlick(
		[
			{
				type: 'arrows',
				query: 'all'
			}
		],
		{
			variableWidth: true,
			centerMode:true
		}
	);

	$('.cbx-card [m-drop-down]').dropDown({
		type: ['mobile', 'portrait']	
	}, function(el){
		var parentCard = el.parents('.cbx-card');
		if( parentCard.attr('m-open') == 'false'){
			parentCard.attr('m-open', 'true');
		}else{
			parentCard.attr('m-open', 'false');
		}
	});
});


export {cbxOverlay}
