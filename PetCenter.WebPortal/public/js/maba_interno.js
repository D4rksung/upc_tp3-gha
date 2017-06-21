

var fn_update_captcha = function(){
        $('#img_captcha').attr('src', $('#img_captcha').attr('src')+'/?'+Math.random());
        $("#txtcaptcha").val("");
        $("#txtnombres").val("");
        $("#txtapellidos").val("");
        $("#txtfechanac").val("");
};
function remove_item_ie(cod_mod){
	$("#dv_"+cod_mod).remove();
}

function tpl_row_ie(cod_mod, ie){
	var html = "";
	html+="<div id='dv_"+ cod_mod +"'>";
	html+="<a href=\"javascript:remove_item_ie('"+cod_mod+"')\">Eliminar</a>";
	html+="<input type='hidden' name='hd_cod_mod' id='hd_cod_mod' value='"+ cod_mod +"'>";	
	html+=ie;
	html+="</div>";
	return html;
}

function validate_ie(cod_mod){
	var response = true;
	$("#dv_ie_selected input").each(function() {
		if($(this).val() == cod_mod){
			response = false;
			return(false);
		}
	});
	return response;
}




function loadIe(userid){
	$("#remove_pass").remove();
	$("#bt_edit_user").remove();
	$("#bt_cancel").remove();
	$("#bt_add").hide();
	

    $.ajax({
        url: 'ajax.do',
        type: 'POST',
        dataType: "json",
        data: {method: 'getIEMapping', userid: userid},
        success: function (data) {
        /*	var html = '';
        	var i = 0; 
        	$.each(data, function() {
        		i++;
				html+='<div id="dv_"'+ this.cod_mod +'> ';
				html+='<a href="javascript:remove_item_ie(\''+ this.cod_mod +'\')">Eliminar</a> ';
				html+='<input type="hidden" value="'+ this.cod_mod +'" id="hd_cod_mod" name="hd_cod_mod">'+ this.lugar +' - ' + this.ie;
				html+='<input type="hidden" value="'+ this.cod_mod +'" id="hd_cod_mod_'+i+'" name="hd_cod_mod_'+i+'">'
				html+='</div>';
        	});   
        		html+='<input type="hidden" value="'+i+'" id="hd_cod_mod_total" name="hd_cod_mod_total">'
        	$("#dv_ie_selected").html(html);
        	//$("#botonera_form").append('<input type="button" class="btn btn-danger" value="CANCELAR" name="bt_cancel" id="bt_cancel" onclick="cancel_action()" />');
        	
        	$("#botonera_form").append('<input type="button" class="btn btn-primary" value="Editar Usuario" name="bt_edit_user" id="bt_edit_user" onclick="e_user('+userid+')" /> <button class="btn btn-danger" name="bt_cancel" id="bt_cancel" onclick="cancel_action()"  >Cancelar</button>');
*/
        	 
        },
        error: function(response){
        	alert(response);
        }
    });	
}

function cancel_action(){
	$("#form_permisos")[0].reset();
//	$("#dv_ie_selected").html("");
	$("#bt_cancel").remove();
	$("#bt_edit_user").remove();
	$("#bt_add").show();
	$("#button-addProyecto button").remove();
	
	//$("#gridExpedienteServicio").hide();
	$('input[name=grppermiso]').attr('checked',false);
	$("#remove_pass").show();
	$("#user_id").val("0")
	
	$.ajax({
		url: 'permisoUser.do?method=cancelEdit', 
		type: 'GET',
		datatype: 'json',
		data: { userid: $('#user_id').val(), cod_mod:$("#sel_ie").val()},
		success: function(data){
			 
			 
			//alert('success cancel')
			//cargaKendo()
        },
        error: function(response){
        	alert('error' + response);
        }
	});
	
}


function validaUsuario(tipo){
	var nombre = $("#txtnomUser").val();
	var apellido = $("#txtapeUser").val();
	var email = $("#txtEmailUser").val();
	var msg = validarEmail(email);
	var dni = $("#txtDNIUser").val();
	var nivel =  $("input[name='grppermiso']:checked").val();
	var count = 0;
	
	if(nombre == ""){ $("#txtnomUser").attr("class","form-control importante"); count++ }else{ $("#txtnomUser").removeClass("importante");  }
	if(apellido == ""){ $("#txtapeUser").attr("class","form-control importante"); count++}else{ $("#txtapeUser").removeClass("importante");  }
	if(email == ""){ $("#txtEmailUser").attr("class","form-control importante"); count++ }else{ $("#txtEmailUser").removeClass("importante");  }
	if(dni == ""){ $("#txtDNIUser").attr("class","form-control importante"); count++}else{ $("#txtDNIUser").removeClass("importante"); }
	if(nivel == undefined){ $("#divgrppermiso").attr("class","col-sm-8 importante"); count++} else{ $("#divgrppermiso").removeClass("importante"); }
	if(msg == "1"){ $("#txtEmailUser").attr("class","form-control importante"); $("#txtEmailUser").val(""); $("#txtEmailUser").attr("placeholder","E-mail Incorrecto"); count++; }else{ $("#txtEmailUser").removeClass("importante"); $("#txtEmailUser").removeAttr("placeholder");  }
	if(dni.length < 8){$("#txtDNIUser").attr("class","form-control importante") ; $("#txtDNIUser").val(""); $("#txtDNIUser").attr("placeholder","El DNI debe de ser 8 digitos"); count++; } else{ $("#txtDNIUser").removeClass("importante"); $("#txtDNIUser").removeAttr("placeholder");  }

	if(tipo == 1){
            var clave = $("#txtClaveUser").val();
            if(clave == ""){ $("#txtClaveUser").attr("class","form-control importante"); count++}else{ $("#txtClaveUser").removeClass("importante"); }
            if(clave.length < 6){$("#txtClaveUser").attr("class","form-control importante") ; $("#txtClaveUser").val(""); $("#txtClaveUser").attr("placeholder","La clave debe de ser mayor a 6 digitos"); count++; } else{ $("#txtClaveUser").removeClass("importante"); $("#txtClaveUser").removeAttr("placeholder");  }
	}
	return count;
}

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

function saveUsuario(){
	var msg_val = validaUsuario(1);
	if(msg_val == 0){
            $.ajax({
                url: 'guardarusuario', 
                type: 'POST',
                datatype: 'text',
                data: { nombre:$("#txtnomUser").val(), apellido:$("#txtapeUser").val(), email:$("#txtEmailUser").val(), dni:$("#txtDNIUser").val(), nivel: $("input[name='grppermiso']:checked").val(), clave: $("#txtClaveUser").val(), estado_usuario: $("#estado_usuario").val() },
                success: function(data){alert('resultado: '+data);
                         var obj = $.parseJSON(data);
                         if(obj == "1"){
                             $("#form_permisos")[0].reset();
                             $('input[name=grppermiso]').attr('checked',false);
                             alert("Se agregó correctamente el usuario.");
                             cargaKendoUsuario();
                             $("#user_id").val("0");
                         }else{
                             alert("Usuario ya existe, favor de ingresar un nuevo DNI.");
                         }
                },
                error: function(response){
                    alert('error' + response);
                }
            });
	}
}

function editar_usuario(){
	
	var msg_val = validaUsuario(0)
	if(msg_val == 0){
	$.ajax({
		url: 'permisoUser.do?method=editarIIEE', 
		type: 'POST',
		datatype: 'json',
		data: { userid: $('#user_id').val(), nombre:$("#txtnomUser").val(), apellido:$("#txtapeUser").val(), email:$("#txtEmailUser").val(), dni:$("#txtDNIUser").val(), nivel: $("input[name='grppermiso']:checked").val(), clave: $("#txtClaveUser").val(), estado_usuario: $("#estado_usuario").val()},
		success: function(data){
		
					$("#form_permisos")[0].reset();
				//	$("#dv_ie_selected").html("");
					$("#bt_cancel").remove();
					$("#bt_edit_user").remove();
					$("#bt_add").show();
					//$("#gridExpedienteServicio").hide();
					$("#remove_pass").show();
					$('input[name=grppermiso]').attr('checked',false);
					alert("Se actualizo correctamente el usuario")
					cargaKendoUsuario();
					$("#user_id").val("0")

        },
        error: function(response){
        	alert('error' + response);
        }
	});
	}
} 

function add_iiee(){
	
	var mod = $("#sel_ie").val();
	var proy = $("#sel_proy").val();
	
	/*
	if($("input[name=grppermiso]:checked").val() == '3'){
		$("#fg_ie").hide();
	}else{
		$("#fg_ie").show();
	}	
	*/
	
	if(mod == "" && $("input[name=grppermiso]:checked").val() != '2' && $("input[name=grppermiso]:checked").val() != '3' && $("input[name=grppermiso]:checked").val() != '4'){
		alert("Debe seleccionar una I.E.");
	}else if(proy == ""){
		alert("Debe seleccionar un Proyecto");
	}else{
	
	$.ajax({
		url: 'permisoUser.do?method=addIIEE', 
		type: 'GET',
		datatype: 'json',
		data: { userid: $('#user_id').val(), cod_mod:$("#sel_ie").val(),cod_proy:$("#sel_proy").val(), userid_new: $('#user_id_new').val(), rol_actual: $('#rol_actual_usuario').val()},
		success: function(data){alert('resultado: '+data);
			if(data == "error1\n"){
				alert("La IE seleccionada ya se encuentra asignada.");
				return;
			}else if(data == "error2\n"){
				alert("Debes de actualizar tu nivel de permiso a Usuario reportador.");
				return;
			}else if(data == "error3\n"){
				alert("Primero debes de crear el usuario antes de asignar un proyecto.");
				return;
			}else{
				$('#user_id_new').val(data);
				cargaKendo();
			}

        },
        error: function(response){
        	alert('error' + response);
        }
	});
	}
	
}



function levantaModal(){
	
	
	$("#sel_ie").val("");
	$("#sel_proy").val("");
	
	if($("input[name=grppermiso]:checked").val() == '2' || $("input[name=grppermiso]:checked").val() == '3' || $("input[name=grppermiso]:checked").val() == '4'){
		$("#fg_ie").hide();
	}else{
		$("#fg_ie").show();
	}
	
	cargaKendo() 
}

function eliminar_ie(vitem){
	
	
 //e.preventDefault();

   // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
 //   wnd.content(detailsTemplate(dataItem));
  //  wnd.center().open();
    
	var cod_mod = $(vitem).parent().parent().children().html();
	
	var id_proy = $(vitem).parent().parent().children().next('td').next('td').next('td').next('td').html();
//	$(this).closest('td').next('td').find('input').show();
   // alert('11 entro eliminar: ' + cod_mod)


	$.ajax({
		url: 'permisoUser.do?method=eliminarIIEE', 
		type: 'GET',
		datatype: 'json',
		data: { userid: $('#user_id').val(), cod_mod: cod_mod, id_proy: id_proy},
		success: function(data){
			//var content = JSON.parse(data);
			//alert('success e_user: '+ data)
			if(data == ""){
				cargaKendo() 
			}else{
				alert("La IE seleccionada ya se encuentra asignada")
			}
        },
        error: function(response){
        	alert('error' + response);
        }
	});

}


function e_user(userid){
	/*alert('edit1 :' + userid + ' | cod: ' + $("#hd_cod_mod[]").val());
	
    $.ajax({
		url: 'permisoUser.do?method=actualizarPermiso', 
		type: 'GET',
		datatype: 'json',
		data: { userid: 1, nombre:$("#txtnomUser").val(), apellido: $("#txtapeUser").val(), email:	$("#txtEmailUser").val(), dni: $("#txtDNIUser").val() , nivel: $("input[name='grppermiso']:checked").val()},
		success: function(data){
			
			alert('success e_user')
        },
        error: function(response){
        	alert('error' + response);
        }
	});
    */
	
	$("#user_id").val(userid);
	
	/* alert($("#user_id").val())
	 document.getElementById("form_permisos").action = "permisoUser.do";
	 $("#h_method").val("actualizarPermiso");
	 $("#form_permisos").submit();*/
    alert('edit2 :' + userid);
}



function loadUser(vitem){
	
	//$("#remove_pass").hide();
	$("#bt_edit_user").remove();
	$("#bt_cancel").remove();
	$("#bt_add").hide();
	
	$("#botonera_form").append('<input type="button" class="btn btn-primary" value="EDITAR" name="bt_edit_user" id="bt_edit_user" onclick="editar_usuario()" /> <button class="btn btn-danger" name="bt_cancel" id="bt_cancel" onclick="cancel_action()"  >CANCELAR</button>');
	//$("#button-addProyecto").html('<button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick=levantaModal()>Agregar Proyecto</button>');
	
	 
	//e.preventDefault();

    //var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    
	//var userid = dataItem.USER_COD
	//alert(userid); 
	
	var userid = $(vitem).parent().parent().children().html();
	//alert(userid);
    $.ajax({
        url: 'getusermapping',
        type: 'POST',
        dataType: "json",
        data: { userid: userid},
        success: function (data) {
        	//response = $.parseJSON(data);
                window.console.log(data);
        	$("#txtnomUser").val(data.USER_NOMBRE);
        	$("#txtapeUser").val(data.USER_APELLIDOS);
        	$("#txtEmailUser").val(data.USER_EMAIL);
        	$("#txtDNIUser").val(data.USER_DNI);
        	
        	$("#estado_usuario").val(data.ESTADO_USUARIO);
        	
        	$('input[name=grppermiso]').attr('checked',false);
        	
        	$("#rol_actual_usuario").val(data.ROLE_ID);
        	
        	
        	//alert("role: " + data.roleid)
        	//$("#grppermiso"+ data.roleid ).attr('checked', true);
        	document.getElementById("grppermiso"+ data.ROLE_ID).checked = true;
        	
        	$("#button-addProyecto").html('<button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick=levantaModal()>Agregar Proyecto</button>');
        	/*
        	if(data.roleid!='2' ){
        		$("#button-addProyecto").html('<button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick=levantaModal()>Agregar Proyecto</button>');
        	}else{
        		$("#button-addProyecto").html('');
        	}
        	*/
        	$("#user_id").val(userid)
        //	cargaKendo();
        //	loadIe(userid);
        }/*,
        error: function(response){
        	alert(response);
        	//window.location = "prosses/login/";
        }*/
    });	
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


function cancelchangePass(){
	//alert("cancelchangePass")
	var userrole = $('#user_rol_change').val()
	window.location = "formoneinit.do?method=init";
	/*
	if(userrole == 1){
		window.location = "form_one.jsp"
	}else if(userrole == 2){
		window.location = "crear-usuario.jsp"
	}else if(userrole == 3){
		window.location = "reporte.jsp"
	}else{
		window.location = "login.jsp"
	}*/
	 
		 
	/*
	$.ajax({
		url: 'permisoUser.do?method=cancelChangePassIIEE', 
		type: 'GET',
		datatype: 'text',
		data: { userid: $('#user_id_change').val(), userrole : $('#user_rol_change').val() },
		success: function(data){
	
        },
        error: function(response){
        	alert('error' + response);
        }
	});
	*/
}



$(document).ready(function(){
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
	
	//cargaKendoUsuario();
});

