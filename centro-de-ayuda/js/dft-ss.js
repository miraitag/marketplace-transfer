//$(document).ready(function(){

function getTopContent(){
	$.ajax({
		url: "/transfer/centro-de-ayuda/menu/top_content.htm",
		async:false,
		context: document.body
	}).done(function(html) {
		$( "#top_content" ).html(html);
	});
}
	getTopContent()
	if($("article.xs-bg-grey-1").length > 0 && !$("article.xs-bg-grey-1").hasClass("validation-form-main")){
		$.ajax({
			url: "/transfer/centro-de-ayuda/form.htm",
			async: false,
		  context: document.body
		}).done(function(html) {
			$("article.xs-bg-grey-1").addClass("validation-form-main")
			$("article.xs-bg-grey-1").after(html);	
			//$("article.xs-bg-grey-1").next().hide();
			$("article.xs-bg-grey-1 a.dft-text").first().attr("id","formself_si").addClass("formself_dec")
			$("article.xs-bg-grey-1 a.dft-text").last().attr("id","formself_no").addClass("formself_dec")
		});
		
		$.getScript("/assets/js/validation-library-4.1-plus.js")
		$.getScript("/transfer/centro-de-ayuda/js/form_selfService.js")
	}

	$.ajax({
		  url: "/transfer/centro-de-ayuda/menu/left_menu.htm",
		  context: document.body,
		  async: false,
		  cache:false
		}).done(function(html) {
		  $("#left_menu").html(html)
		  $("#left_menu a").each(function(){
		  if($(this).attr("data-target") == undefined){
				if( $(this).attr("href").indexOf(  window.location.pathname.replace(/[a-z\d-_]+\.\w+/g, "")) != -1 ){
					$(this).closest("li").addClass("active").closest(".collapse").addClass("in").css("height","auto").parent().find("> a").attr("aria-expanded","true");
					$(this).closest("div.panel").addClass("active");
				}
		    }
		})
	});

	$("#left_menu").parents("article").addClass("sticky-menu");
	
		$(".dft-text-link.visible-xs").on("click", function(){
		$("#left_menu > #accordion").removeClass("hidden-xs");
		$(this).closest("article").hide();
		//fin
	})
//});