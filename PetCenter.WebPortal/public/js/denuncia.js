/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



    $(document).ready(function() {
        var divR = "";
        
        $.ajax({
                type: "POST",
                url: 'prosses/listardenunciado',            
                dataType: "json",
                success: function(data) {
                   
                        $("#divAddDenunciado").empty();
                        $.each(data.data,function (key,val){
                            
                            divR+="<div class='list-group-item col-md-12' style='border:0; background: none'>&nbsp;</div>";
                            
                            divR+="<div class='detalle_denuncia_item'>";
                            divR+="<div class=\"list-group-item col-md-4\">";
                            divR+="<input type=\"text\" class=\"borderl\" id=\"txtnombresDenunciado_"+key+"\" name=\"txtnombresDenunciado_"+key+"\"  value=\""+val["nombreDenuncia"]+"\" readonly=\"true\"></div>";
                            divR+="<div class=\"list-group-item col-md-4\">";
                            divR+="<input type=\"text\" class=\"\" id=\"txtapellidosDenunciado_"+key+"\" name=\"txtapellidosDenunciado_"+key+"\"  value=\""+val["apellidosDenuncia"]+"\" readonly=\"true\"></div>";
                            divR+= "<div class=\"list-group-item col-md-4\">";
                            divR+= "<input type=\"text\" class=\"\"  id=\"txtDniDenunciado_"+key+"\"  name=\"txtDniDenunciado_"+key+"\"  value=\""+val["dniDenuncia"]+"\" readonly=\"true\"></div>";
                            divR+= "<div class=\"list-group-item col-md-4\">";
                            divR+= "<input type=\"text\" class=\"borderl\"  id=\"cboentidad"+key+"\"  name=\"cboentidad"+key+"\"  value=\""+val["desentidad"]+"\" readonly=\"true\"></div></div>";
                            divR+= "<div class=\"list-group-item col-md-4\">";
                            divR+= "<input type=\"text\" class=\"\"  id=\"cbocargo"+key+"\"  name=\"cbocargo"+key+"\"  value=\""+val["descargo"]+"\" readonly=\"true\"></div></div>";
                            divR+= "<div class=\"list-group-item col-md-4\">";
                            //divR+= "<input type=\"text\" class=\"btn btn-danger\" id=\"btneliminar\" onclick=\"eliminarDenunciado('"+val["item"]+"')\" placeholder=\"Eliminiar denunciado\"></div>";
                            divR+= "<button id='btnagregar' class='btn btn-danger' type='button' onclick=\"eliminarDenunciado('"+val["item"]+"')\">Eliminiar denunciado</button></div>";
                            
                        });
                        $("#divAddDenunciado").html(divR);
                }
            });
        
     $("#cbotipo_via").change(function (){
         $("#cbotipo_via").removeClass("form-control2");
     });
     
     $("#cboregion").change(function (){
         $("#cboregion").removeClass("form-control2");
     });
     
     $("#cboprovincia").change(function (){
         $("#cboprovincia").removeClass("form-control2");
     });
     
      $("#cbodistrito").change(function (){
         $("#cbodistrito").removeClass("form-control2");
     });
      $("#cboentidad").change(function (){
         $("#cboentidad").removeClass("form-control2");
     });
     $("#cbocargo").change(function (){
         $("#cbocargo").removeClass("form-control2");
     });
     $("#cbonotificacion").change(function (){
         $("#cbonotificacion").removeClass("form-control2");
     });
     
    $("#txtemailConfirm").blur(function(){
        var email = $("#txtemail").val();
        var email2 = $("#txtemailConfirm").val();
        
        if(email != email2){
            alert('Correo electronico diferente')
            $("#txtemailConfirm").val("");
            $("#txtemailConfirm").addClass("form-control1");
            
        }
    });

 $("#txtemail").blur(function(){
    var email = $("#txtemail").val();
    
   if(!validateEmail(email)){
       alert('Correo electronico incorrecto')
       //$("#txtemail").val("");
       $("#txtemail").addClass("form-control1");
   }
    
});



$("#btnconsultar").click(function(){
    
    //alert(1);
        var dni = $("#txtdni").val();
        var ubigeo = $("#txtubigeo").val();
        var captcha = $("#input4").val();
        
        var flag = validaCampo("txtdni",1,8,1)* validaCampo("txtubigeo",1,6,1)* validaCampo("input4",1,6,1);
     //   alert(flag);
        
        if(flag == 1){        
       // alert('captcha:' + captcha + '| dni:' + dni +'| ubigeo:' + ubigeo);
            $.ajax({
                type: "POST",
                url: 'main/service',
                data: {captcha:captcha,dni:dni,ubigeo:ubigeo },
                dataType: "json",
                success: function(data) {
                 //   alert(data)
                    if(data.AP_RESULTS != 1){
                        alert(data.AP_MENSAJE);
                        $("#txtnombres").val("");
                        $("#txtapellidos").val("");
                        $("#txtfechanac").val("");
                    }else{
                        $("#txtnombres").val(data.AP_NOMBRES);
                        $("#txtapellidos").val(data.AP_PATERNO +' ' + data.AP_MATERNO);
                        $("#txtfechanac").val(data.AP_FECHA_NAC);
                    }
                    

                }
            });
        }else{
            alert('Ingrese los datos solicitados correctamente.')
        }
            
        });
            
            
             $("#cboregion").change(function (){
            var region = $("#cboregion").val();
            var cmb = "<option value=\"\" hidden=\"\" selected=\"\">Provincia</option>";
            $.ajax({
                type: "POST",
                url: 'main/listaprovincia',
                data: {region:region},
                dataType: "json",
                success: function(data) {
                   $.each(data,function (key,val){
                       cmb +="<option value="+val["id_provincia"]+">"+val["provincia"]+"</option>";
                   });
                   $("#cboprovincia").html(cmb);
                }
            });
            
        });
        
        $("#cboprovincia").change(function (){
            var provincia = $("#cboprovincia").val();
             var cmb = "<option value=\"\" hidden=\"\" selected=\"\">Distrito</option>";
            $.ajax({
                type: "POST",
                url: 'main/listadistrito',
                data: {provincia:provincia},
                dataType: "json",
                success: function(data) {
                   $.each(data,function (key,val){
                       cmb +="<option value="+val["id_distrito"]+">"+val["distrito"]+"</option>";
                   });
                   $("#cbodistrito").html(cmb);
                }
            });
            
        });
        
        
        $("#btnagregar").click(function(){
            
               
                var nombreDenuncia = $("#txtnombresDenunciado").val();
                var apellidosDenuncia = $("#txtapellidosDenunciado").val();
                var dniDenuncia = $("#txtDniDenunciado").val();
                var entidad = $("#cboentidad").val();
                var cargo = $("#cbocargo").val();
                var descargo = $("#cbocargo option:selected").text();
                var desentidad = $("#cboentidad option:selected").text();
                var div = "";
                
                 var flag = validaCampo("txtnombresDenunciado",1,150,0) * validaCampo("txtapellidosDenunciado",1,150,0) *
                        validaCampo("cboentidad",2,0,0) * validaCampo("cbocargo",2,0,0);
                if(flag == 1){
        //alert(nombreDenuncia + " | " +apellidosDenuncia  + " | " + dniDenuncia + " | " + entidad + " | " + cargo + " | " + descargo + " | " + desentidad );
        
           $.ajax({
                type: "POST",
                url: 'prosses/adddenunciado',
                data: {nombreDenuncia:nombreDenuncia,apellidosDenuncia:apellidosDenuncia,dniDenuncia:dniDenuncia,entidad:entidad,cargo:cargo,descargo:descargo,desentidad:desentidad},
                dataType: "json",
                success: function(data) {
                    if(data.mensaje == '1'){
                        alert('el dni ingresado ya existe');
                    }else{
                        $("#divAddDenunciado").empty();
                        div="";
                        $.each(data.data,function (key,val){
                           
                            div+="<div class='list-group-item col-md-12' style='border:0; background: none'>&nbsp;</div>";
                            div+="<div class=\"list-group-item col-md-4\">";
                            div+="<input type=\"text\" class=\"borderl\" id=\"txtnombresDenunciado_"+key+"\" name=\"txtnombresDenunciado_"+key+"\"  value=\""+val["nombreDenuncia"]+"\" readonly=\"true\"></div>";
                            div+="<div class=\"list-group-item col-md-4\">";
                            div+="<input type=\"text\" class=\"\" id=\"txtapellidosDenunciado_"+key+"\" name=\"txtapellidosDenunciado_"+key+"\"  value=\""+val["apellidosDenuncia"]+"\" readonly=\"true\"></div>";
                            div+= "<div class=\"list-group-item col-md-4\">";
                            div+= "<input type=\"text\" class=\"\"  id=\"txtDniDenunciado_"+key+"\"  name=\"txtDniDenunciado_"+key+"\"  value=\""+val["dniDenuncia"]+"\" readonly=\"true\"></div>";
                            div+= "<div class=\"list-group-item col-md-4\">";
                            div+= "<input type=\"text\" class=\"borderl\"  id=\"cboentidad"+key+"\"  name=\"cboentidad"+key+"\"  value=\""+val["desentidad"]+"\" readonly=\"true\"></div></div>";
                            div+= "<div class=\"list-group-item col-md-4\">";
                            div+= "<input type=\"text\" class=\"\"  id=\"cbocargo"+key+"\"  name=\"cbocargo"+key+"\"  value=\""+val["descargo"]+"\" readonly=\"true\"></div></div>";
                            div+= "<div class=\"list-group-item col-md-4\">";
                            //div+= "<input type=\"text\" class=\"\" id=\"btneliminar\" onclick=\"eliminarDenunciado('"+val["item"]+"')\" placeholder=\"Eliminiar denunciado\"></div>";
                            div+= "<button id='btnagregar' class='btn btn-danger' type='button' onclick=\"eliminarDenunciado('"+val["item"]+"')\">Eliminiar denunciado</button></div>";
                            
                        });
                        $("#divAddDenunciado").html(div);
                        
                       // actualizargrilla();
                       // $('#grid-command-buttons').bootgrid('reload');
                      // $('#gridExpedienteServicio').data('kendoGrid').dataSource.read();
                       //cargaKendo();
                    }
                    
                    
                    $("#txtnombresDenunciado").val("");
                    $("#txtnombresDenunciado").removeClass("form-control1");
                    $("#txtapellidosDenunciado").val("");
                    $("#txtapellidosDenunciado").removeClass("form-control1");
                    $("#txtDniDenunciado").val("");
                    $("#txtDniDenunciado").removeClass("form-control1");
                    $("#cboentidad").val("");
                    $("#txtDniDenunciado").removeClass("form-control2");
                    $("#cbocargo").val("");
                    $("#txtDniDenunciado").removeClass("form-control2");
                }
            });
                }else{
                    alert('Ingrese los datos solicitados correctamente.') 
                }
            });
            
     /*FIN DEL READY*/});
 

    function eliminarDenunciado(id){
        //alert(id)
           var div = "";
                $.ajax({
                type: "POST",
                url: 'prosses/deletedenunciado',
                data: {id:id},
                dataType: "json",
                success: function(data) {
                    
                    $("#divAddDenunciado").empty();
                        $.each(data.data,function (key,val){
                            div+="";
                            div+="<div class='list-group-item col-md-12' style='border:0; background: none'>&nbsp;</div>";
                            div+="<div class=\"list-group-item col-md-4\">";
                            div+="<input type=\"text\" class=\"borderl\" id=\"txtnombresDenunciado_"+key+"\" name=\"txtnombresDenunciado_"+key+"\"  value=\""+val["nombreDenuncia"]+"\" readonly=\"true\"></div>";
                            div+="<div class=\"list-group-item col-md-4\">";
                            div+="<input type=\"text\" class=\"\" id=\"txtapellidosDenunciado_"+key+"\" name=\"txtapellidosDenunciado_"+key+"\"  value=\""+val["apellidosDenuncia"]+"\" readonly=\"true\"></div>";
                            div+= "<div class=\"list-group-item col-md-4\">";
                            div+= "<input type=\"text\" class=\"\"  id=\"txtDniDenunciado_"+key+"\"  name=\"txtDniDenunciado_"+key+"\"  value=\""+val["dniDenuncia"]+"\" readonly=\"true\"></div>";
                            div+= "<div class=\"list-group-item col-md-4\">";
                            div+= "<input type=\"text\" class=\"borderl\"  id=\"cboentidad"+key+"\"  name=\"cboentidad"+key+"\"  value=\""+val["desentidad"]+"\" readonly=\"true\"></div></div>";
                            div+= "<div class=\"list-group-item col-md-4\">";
                            div+= "<input type=\"text\" class=\"\"  id=\"cbocargo"+key+"\"  name=\"cbocargo"+key+"\"  value=\""+val["descargo"]+"\" readonly=\"true\"></div></div>";
                            div+= "<div class=\"list-group-item col-md-4\">";
                            //div+= "<input type=\"text\" class=\"\" id=\"btneliminar\" onclick=\"eliminarDenunciado('"+val["item"]+"')\" placeholder=\"Eliminiar denunciado\"></div>";
                            div+= "<button id='btnagregar' class='btn btn-danger' type='button' onclick=\"eliminarDenunciado('"+val["item"]+"')\">Eliminiar denunciado</button></div>";
                        });
                        $("#divAddDenunciado").html(div);
                    
                        }
                });
            }
            
    function validaCampo(campo,tipo,cantidad,cantidadobligatorio){
        var flag = 1;
        var campo_ = $("#"+campo+"").val();
        
  // alert('campo: '+ campo + " | tipo: " +tipo + 'cantidad: '+ cantidad + '| campo_: ' + campo_ + '| campo_.length: ' + campo_.length + "| cantidadobligatorio:" + cantidadobligatorio)
    
         if(tipo == 1){
             
            if(campo_.length == 0){
                        $("#"+campo+"").addClass("form-control1");
                        $("#"+campo+"").val("");
                        flag = 0;
            }

            if(campo_.length == 0){
                            $("#"+campo+"").addClass("form-control1");
                            $("#"+campo+"").val("");
                            flag = 0;
            }else{
                   if(cantidadobligatorio == 1){
                      if(campo_.length != cantidad){
                            $("#"+campo+"").addClass("form-control1");
                            $("#"+campo+"").val("");
                            flag = 0;
                        } 
                   }else{
                       if(campo_.length <= cantidad){
                           
                        } else{
                            $("#"+campo+"").addClass("form-control1");
                            $("#"+campo+"").val("");
                            flag = 0;
                        }
                   }
            }
             
            
         }else{
            if(campo_.length == 0){
                $("#"+campo+"").addClass("form-control2");
                $("#"+campo+"").val("");
                flag = 0;
            } 
         }
         
         
   //   alert('campo_: ' + campo_+' | validaCampo:' + flag )
         return flag;
         
    }
    
    function enviardenuncia(){
        
       var flag = validaCampo("cbotipo_via",2,0,0) * validaCampo("txtdireccion",1,100,0) * validaCampo("txtnumdir",1,50,0) * 
                  validaCampo("txtreferencia",1,250,0) * validaCampo("cboregion",2,0,0) * validaCampo("cboprovincia",2,0,0) *
                  validaCampo("cbodistrito",2,0,0) * validaCampo("txtTelfijo",1,7,0) * validaCampo("txtTelcell",1,9,1)*
                  validaCampo("cbonotificacion",2,0,0) * validaCampo("txtemail",1,150,0) * validaCampo("txtemailConfirm",1,150,0)*
                  validaCampo("txtdni",1,8,1)* validaCampo("txtubigeo",1,6,1)* validaCampo("input4",1,6,1)* validaCampo("txtdescripcionden",1,500,0);
       
   //   alert('> flag:' + flag) 
      if(flag == 1){
          //$("#formDenuncia").submit();
           $("#myModalConfirma").modal('show');
      }else{
         alert('Ingrese los datos solicitados correctamente.') 
      }
    }
    
    function soloNumeros(e){
                          key = e.keyCode || e.which;
                          tecla = String.fromCharCode(key).toLowerCase();
                          letras = " 0123456789-";
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
                         
                         function LetrasNumeros(e){
                            key = e.keyCode || e.which;
                            tecla = String.fromCharCode(key).toLowerCase();
                            letras = " áéíóúabcdefghijklmnñopqrstuvwxyz0123456789";
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
                         
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function confirmaDenuncia(){
        $("#formDenuncia").submit();
    }
    