import '../../../components/templates/services/style.pcss'

const cardsServices = $('[m-desk|=servicios] .digitals-cards');	
	
function loadSlick(){
	if(window.matchMedia('(max-width:767px)').matches){
		cardsServices.willSlick(
			{
				type : 'dots',
				query: 'mobile'
			},{
				variableWidth: true,
				centerMode: true
			}
		);
	}else if(window.matchMedia('(min-width:768px) and (max-width:1024px) and (orientation:portrait)').matches){
		cardsServices.willSlick(
			{
				type : 'dots',
				query: 'portrait'
			},{
				variableWidth: true
			}
		)
	}
}
function resize(){
	window.addEventListener('resize', function(){
		loadSlick();
	});
}

$(document).ready(function(){
	loadSlick()
	resize();
});