var form = {
	load:function(){
		$("#form_self").hide()
		console.log("hide")
		$(".formself_dec").click(function(e){
			e.preventDefault();
			$("#form_self").show()
			$(".prev_valid").addClass("req")
			$("[name='field_0']").val($(this).html())
		})
		 $("#send_CentroAyuda").click(function(e){
			e.preventDefault();
			var validation = $(this).closest("form").validationLibrary();
			if(validation.validate() && !$("#formSection").hasClass("validation-input-danger")){
				form.define()
			}
		});

	},
	define: function (){
		var path = window.location.pathname;
		if(path.indexOf("hipotecarios") != -1){
			var mail = "postventa@citibanamex.com";
		//	var mail = "edgar.molina@citi.com";
			form.sendMail(mail)
		}else{
			form.sendEncuesta()
		}
			
	},
	sendMail: function (mail){
		// $.getScript("/assets/js/validation-library-4.1-plus.js")
			// .done(function(script, textStatus) {
				// console.log(textStatus);
				
				dtf_encuesta.onSuccess = function() {
					//mail
						var datosMail = new Object();
						datosMail.TefueUtil=$( "[name='field_0']").val()
						datosMail.Comentario=$( "[name='field_1']").val()
						datosMail.emailCliente=$( "[name='field_3']").val()
						datosMail.NoCliente=$( "[name='field_4']").val()
						datosMail.emailDestinatario=mail
						datosMail.Nombre=$( "[name='field_2']").val()
						datosMail.ordenParametros="TefueUtil|Comentario|Nombre|NoCliente|emailDestinatario|emailCliente|ordenParametros"
						var info = {
								url: "Contactanos.html",
								params: encodeParams(datosMail)
						};
						var res = sendRequestMail2(info);
						function sendRequestMail2(datos) {
						dtc_Html.onSuccess = function(html, j) {
							if (html.respuesta.indexOf("OK")!=-1) {
								console.log("ok")
							} else {
								console.log("fail hipotecario")
							}
								$(".form_self").hide();
								$(".validation-response-success").show();
							};
						dtc_Html.onError = function() {
						};
						dtc_Html.post(datos);
						}	
				}
				$("#send_encuesta").trigger("click")
			// })
			
	},
	sendEncuesta: function (){
		$("#send_encuesta").trigger("click")
	}
}

form.load();

