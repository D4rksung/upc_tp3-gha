$(document).ready(function () {
    
    $("#cb_clasificacion_hecho").attr("disabled",true);
    
    $("#bt_generar_oficio").attr("disabled",true);
    $("#bt_guardar_enviar").attr("disabled",true);
    
    
    $("#lista_archivos .dw_imagen").click(function(){
        var imagen = $(this).attr("alt");
        
        $.redirect('download', 
                    { 'imagen': imagen },
                    'POST'
        );
        
    });
    
    $('input[name="optionsRadios"]').on("click", function(e) {
        var elemento_seleccionado = "";
        
        if($(this).attr("id") == 'optionsRadios3'){
            $("#cb_clasificacion_hecho").attr("disabled",false);
            
            $("#bt_generar_oficio").attr("disabled",false);
            $("#bt_guardar_enviar").attr("disabled",true);
        }else{
            $("#cb_clasificacion_hecho").val("");
            $("#cb_clasificacion_hecho").attr("disabled",true);
            
            $("#bt_generar_oficio").attr("disabled",true);
            $("#bt_guardar_enviar").attr("disabled",false);
        }
    });


});