

var fn_update_captcha = function(){
        $('#img_captcha').attr('src', $('#img_captcha').attr('src')+'/?'+Math.random());
        $("#txtcaptcha").val("");
        $("#txtnombres").val("");
        $("#txtapellidos").val("");
        $("#txtfechanac").val("");
};

function soloLetras(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for(var i in especiales){
         if(key == especiales[i]){
             tecla_especial = true;
             break;
         }
     }

     if(letras.indexOf(tecla)==-1 && !tecla_especial){
         return false;
     }
 }
function soloNumeros(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "1234567890";
    especiales = "8-37-39-46";

    tecla_especial = false
    for(var i in especiales){
         if(key == especiales[i]){
             tecla_especial = true;
             break;
         }
     }

     if(letras.indexOf(tecla)==-1 && !tecla_especial){
         return false;
     }
 }

function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ){
    	return "1"
    }else{
    	return "2"
    }
      //  alert("Error: El e-mail '" + email + "' es incorrecto.");
}

function saveUsuario(){
	
	//alert("saveUsuario")

	var msg_val = validaUsuario(1)
	
	if(msg_val == 0){

	$.ajax({
		url: 'permisoUser.do?method=guardarIIEE', 
		type: 'POST',
		datatype: 'text',
		data: { nombre:$("#txtnomUser").val(), apellido:$("#txtapeUser").val(), email:$("#txtEmailUser").val(), dni:$("#txtDNIUser").val(), nivel: $("input[name='grppermiso']:checked").val(), clave: $("#txtClaveUser").val(), estado_usuario: $("#estado_usuario").val() },
		success: function(data){
			//alert(data)
			 var obj = $.parseJSON(data);
			// alert("obj: " + obj) 
			if(obj == "1"){
				
			
				   $("#form_permisos")[0].reset();
					//$("#dv_ie_selected").html("");
					//$("#bt_cancel").remove();
					//$("#bt_edit_user").remove();
					//$("#bt_add").show();
					//$("#gridExpedienteServicio").hide();
					//$("#remove_pass").show();
					$('input[name=grppermiso]').attr('checked',false);
					alert("Se agrego correctamente el usuario")
					cargaKendoUsuario();
					$("#user_id").val("0")
			}else{
				alert("usuario ya existe, favor de ingresar un nuevo DNI")
			}
        },
        error: function(response){
        	alert('error' + response);
        }
	});
	}
}

$(document).ready(function(){
    $('#loginForm').bootstrapValidator({
        message: 'Este valor no es valido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            USER_DNI: {
                validators: { 
                    notEmpty: {
                        message: 'El nombre de usuario es requerido'
                    }
                }
            },
            USER_PASS: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida'
                    }
                }
            }
        }
    });
    
	$("#button-addProyecto").html('');
	$("#rol_actual_usuario").val("");	
	$("input[name='grppermiso']").change(function () {
		
		
		
		window.console.log($(this).val());
		if($(this).val()=="2"){
			$("#button-addProyecto").html('');
		}else{
			if($("#user_id").val()>0){
				$("#button-addProyecto").html('<button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick=levantaModal()>Agregar Proyecto</button>');
			}
		}
	});
	
	$("#bt_agregar_ie").click(function(){
		var cod_mod = $("#sel_ie").val();
		var ie = $("#sel_ie option:selected").html();
		var html = tpl_row_ie(cod_mod, ie);
		var response = validate_ie(cod_mod);
		if(cod_mod!=""){
			if(response==true){
				//$("#dv_ie_selected").append(html);
				$("#sel_ie").val("");
				cargaKendo()
			}else{
				$("#sel_ie").val("");
				alert("La IIEE ya se encuentra agregada");
			}			
		}else{
			alert("Seleccione una IIEE");
		}
	});
});

