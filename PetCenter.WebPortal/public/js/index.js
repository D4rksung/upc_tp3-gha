
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
  var emptyCombo = '<option value="">Seleccionar</option>';
  var grilla =  $('#grid-command-buttons');  
  
  
  

var cantidad = 10;
var dataSource;
            
    $(document).ready(function() {

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        // on success
                        url: "prosses/listardenunciado/",
                        dataType: "json",
                        //contentType:"application/json; charset=utf-8",
                        cache: false
                    },
                     update: function (e) {
                    },
                    destroy: function (e) {
                    }
                },
                error: function (e) {
                    // handle data operation error
               //     alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                },
                pageSize: 10,
                batch: false,
                schema: {
                    data: "data",
                    model: {
                        id: "item",
                        fields: {
                            item: { editable: false, nullable: true },
                            nombreDenuncia: { editable: true, nullable: true },
                            apellidosDenuncia: { editable: true, nullable: true },
                            dniDenuncia: { editable: true, nullable: true },
                            desentidad: { editable: true, nullable: true },
                            descargo: { editable: true, nullable: true }
                        }
                    }
                }
            });

            $("#gridExpedienteServicio").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                //toolbar: ["create"],
                columns: [
                    { field: "nombreDenuncia", title: "Nombres", width: 30, filterable: false },
                    { field: "apellidosDenuncia", title: "Apellidos", width: 50, filterable: false },
                    { field: "dniDenuncia", title: "DNI", width: 50, filterable: false },
                    { field: "desentidad", title: "Entidad", width: 100, filterable: false },
                    { field: "descargo", title: "Cargo", width: 80, filterable: false },
                    { command: "destroy" }
                ],
                editable: "inline",
                remove:function(e){ 
                    eliminarLista(e.model.item);
                }                
            }); 
        
        
        
        
        $("#cboregion").change(function (){
            var region = $("#cboregion").val();
            var cmb = emptyCombo;
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
            var cmb = emptyCombo;
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
        
    $("#btnconsultar").click(function(){
        
        var captcha = $("#txtcaptcha").val();
        var dni = $("#txtdni").val();
        var ubigeo = $("#txtubigeo").val();
        
            $.ajax({
                type: "POST",
                url: 'main/service',
                data: {captcha:captcha,dni:dni,ubigeo:ubigeo },
                dataType: "json",
                success: function(data) {
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
            
            });

             $("#btnagregar").click(function(){
               
                var nombreDenuncia = $("#txtnombresDenunciado").val();
                var apellidosDenuncia = $("#txtapellidosDenunciado").val();
                var dniDenuncia = $("#txtDniDenunciado").val();
                var entidad = $("#cboentidad").val();
                var cargo = $("#cbocargo").val();
                var descargo = $("#cbocargo option:selected").text();
                var desentidad = $("#cboentidad option:selected").text();
        
            $.ajax({
                type: "POST",
                url: 'prosses/adddenunciado',
                data: {nombreDenuncia:nombreDenuncia,apellidosDenuncia:apellidosDenuncia,dniDenuncia:dniDenuncia,entidad:entidad,cargo:cargo,descargo:descargo,desentidad:desentidad},
                dataType: "json",
                success: function(data) {
                    if(data.mensaje == '1'){
                        alert('el dni ingresado ya existe');
                       
                    }else{
                       // actualizargrilla();
                       // $('#grid-command-buttons').bootgrid('reload');
                       $('#gridExpedienteServicio').data('kendoGrid').dataSource.read();
                       //cargaKendo();
                    }

                }
            });
            
            
            });
            
           
            
             //cargaKendo();
           //  $('#gridExpedienteServicio').data('kendoGrid').refresh();
             });
             /*FIN DEL READY*/
             
              $(".eliminareg").bind( "click", function() {
                 alert( "-->");
                    alert( "-->" + $(this).data("row-id") );
                  });
                  
              var fn_update_captcha = function(){
    
                $('#img_captcha').attr('src', $('#img_captcha').attr('src')+'/?'+Math.random());
                $("#txtcaptcha").val("");
                $("#txtnombres").val("");
                        $("#txtapellidos").val("");
                        $("#txtfechanac").val("");
                /*
                $.ajax({
                    url: 'main/getcaptcha/',
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        if(data.AP_RESULTS == "1"){
                            $("#img_captcha").attr("src",'main/captcha/?a=1');
                            // $("#img_captcha").attr("src",data.AP_MENSAJE);
                            $("#txt_captcha").val("");
                        }
                    }
                }); 
                */
            };
            
          
    
    function eliminarLista(item){
     $.ajax({
                type: "POST",
                url: 'prosses/deletedenunciado',
                data: {id:item},
                dataType: "json",
                success: function(result) {
 
               //   dataSource.sync();
                                    
                }
            });
        
    }
    /*
     function cargaKendo(){
	  
	//  cargarTotal();
	  
	//  alert('1 - '+ $('#cbprovincia').val()+ ' - 2 - '+ $('#cbdistrito').val());
	 	
	    //$("#gridExpedienteServicio").empty();
	    //$("#gridExpedienteServicio").html('');
	    
	    var cantidad = 10
	    var dsServicio = new kendo.data.DataSource({
	        serverFiltering: true,
	        serverPaging: true,
	        type: 'odata',
	        serverSorting: true,
	        pageSize: parseInt(cantidad),
	        transport: {
	            read: {
	                url: "prosses/listardenunciado",
	                dataType: "json"
	            },
	            parameterMap: function (options, type) {
	                var Paginacion = options.pageSize;
	                var Pagina = options.page;
	                var paramMap = kendo.data.transports.odata.parameterMap(options);
	                var inicio = parseInt(Pagina) - 1
	                
	                if(Pagina=="1"){
	                	inicio = 0;
	                }else{
	                	inicio = Paginacion * inicio
	                }
	                
	                
	                
	                paramMap.Pagina = Pagina;
	                paramMap.Paginacion = Paginacion;
	                paramMap.inicio = inicio;
	                paramMap.cantidad = Paginacion;
	                
	              //  alert('Pagina: ' + paramMap.Pagina + ' | Paginacion: '+ paramMap.Paginacion + '| paramMap.id_region: ' + paramMap.id_region + '| paramMap.id_provincia: ' + paramMap.id_provincia + '| paramMap.id_distrito: ' + paramMap.id_distrito + '| paramMap.iiee: ' + paramMap.iiee + '| paramMap.inicio: ' + paramMap.inicio + '| paramMap.cantidad: ' + paramMap.cantidad)               
	  //  alert('2 - Pagina: ' + Pagina + ' -  2 - Paginacion: ' + Paginacion);
	                return paramMap;
	            }
	        },
	        schema: {
	            data: "data",
	            total: "total"
	        }
	    });
	   // alert('3');
	  
	    var _params = {
	            dataSource: dsServicio,
	            pageable: { refresh: true, pageSizes: [5, 10, 20], pageSize: 5, buttonCount: 3 },
	            //filterable: { mode: "row" }, 
	            filterable: { extra: false },
	            editable: false,
	            //height: 543
	            columns: [
	                { field: "item", hidden: true },
	                { field: "nombreDenuncia", title: "Nombres", width: 30, filterable: false },
	                { field: "apellidosDenuncia", title: "Apellidos", width: 50, filterable: false },
	                { field: "dniDenuncia", title: "DNI", width: 50, filterable: false },
	                { field: "desentidad", title: "Entidad", width: 100, filterable: false },
	                { field: "descargo", title: "Cargo", width: 80, filterable: false },

	                { command: [{ name: "Seleccionar", template: "<div class='k-grid-historico k-button' onclick='eliminarLista(this);' ><span class='k-icon k-i-maximize'></span>&nbsp;&nbsp;Seleccionar</div>" }], title: " ", width: 40 },
	             
	                //{ command: [{ name: "Registrar", template: "<div class='k-grid-historico k-button' onclick='fn_SeleccionarServ(this);' ><span class='k-icon k-i-maximize'></span>&nbsp;&nbsp;Seleccionar</div>" }], title: " ", width: 100 },
	                //{ command: [{ name: "Registrar", template: "<div class='k-grid-historico k-button' onclick='fn_Click(this);' ><span class='k-icon k-i-maximize'></span>&nbsp;&nbsp;Ver Detalle</div>" }], title: " ", width: 150 } 

	            ]
	        };
	    
	    /***********************************************************************************************
	    var grid = $("#gridExpedienteServicio").kendoGrid(_params);
	    /***********************************************************************************************
	    $("#gridExpedienteServicio").data("kendoGrid").dataSource.read();
	    
  }
*/