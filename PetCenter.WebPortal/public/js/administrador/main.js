var grilla = $('#grid-command-buttons');
var cantidad = 10;
var dataSource;

$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: 'verificarOficio',
        dataType: "json",
        success: function (data) {
            if(data.status == '1'){
                
                var a = document.createElement('a');
                a.href='descargarOficio';
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();                
                //location.href = 'descargarOficio';
            }
        }
    });

    $("#btnconsultarAdmin").click(function () {

        var data_autogenerado = $("#txtAutoGeneradoAdmin").val();
        var data_denunciante  = $("#txtdatosDenunciante").val();
        var data_dni          = $("#txtDNIdenunciante").val();
        var data_sinad        = $("#txtSinadAdmin").val();

        $.ajax({
            type: "POST",
            url: 'buscardenuncia',
            data: {
                data_autogenerado: data_autogenerado, 
                data_denunciante: data_denunciante, 
                data_dni: data_dni, 
                data_sinad: data_sinad
            },
            dataType: "json",
            success: function (data) {
                $('#gridAdminServicio').data('kendoGrid').dataSource.read();
            }
        });

    });


    dataSource = new kendo.data.DataSource({
        pageSize: 10,
        serverPaging: true,
        transport: {
            read: {
                // on success
                type: "POST",
                url: "listardenuncia",
                dataType: "json",
                data: {ticket: "", datos: "", dni: "", sinad: ""},
                //contentType:"application/json; charset=utf-8",
                cache: false

            },
            update: function (e) {
            },
            destroy: function (e) {
            }
        },
        parameterMap: function (options, type) {
            var Paginacion = options.pageSize;
            var Pagina = options.page;
            var paramMap = kendo.data.transports.odata.parameterMap(options);
            var inicio = parseInt(Pagina) - 1;
            if (Pagina == "1") {
                inicio = 0;
            } else {
                inicio = Paginacion * inicio
            }
            paramMap.Pagina = Pagina;
            paramMap.Paginacion = Paginacion;
            paramMap.id_region = 1;
            paramMap.inicio = inicio;
            paramMap.cantidad = Paginacion;
            return paramMap;
        },
        error: function (e) { },
        batch: false,
        schema: {
            data: "data",
            total: "total",
            model: {
                id: "item",
                fields: {
                    item: {editable: false, nullable: true},
                    nombreDenuncia: {editable: true, nullable: true},
                    apellidosDenuncia: {editable: true, nullable: true},
                    dniDenuncia: {editable: true, nullable: true},
                    desentidad: {editable: true, nullable: true},
                    descargo: {editable: true, nullable: true}
                }
            }
        }
    });

    $("#gridAdminServicio").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        selectable: "row",
        //toolbar: ["create"],
        columns: [
            {field: "id_", title: "Autogenerado", width: 150, filterable: false},
            {field: "fecha_registro", title: "Registro", width: 150, filterable: true},
            {field: "region", title: "Region", width: 150, filterable: false},
            {field: "provincia", title: "Provincia", width: 100, filterable: false},
            {field: "distrito", title: "Distrito", width: 80, filterable: false},
            {field: "tipo_notificacion", title: "Notificacion", width: 80, filterable: false},
            {field: "descripcion_denuncia", title: "Hechos", width: 80, filterable: false},
            {field: "des_estado", title: "Estado", width: 80, filterable: false},
            {field: "des_tipo", title: "Tipo", width: 80, filterable: false},
            {field: "tiempo_denuncia", title: "Tiempo", width: 80, filterable: false},
            {field: "sinad", title: "Sinad", width: 80, filterable: false},
            {command: "destroy"}
        ],
        editable: "inline",
        remove: function (e) {
            eliminarLista(e.model.item);
        }
    });


    var grid = $("#gridAdminServicio").data("kendoGrid");
    grid.element.delegate("tbody>tr", "dblclick", function () {
        //var expediente = $(this).closest("tr").addClass("selectedRow");
        var expediente = $(this).find('td:first').html();
        $.redirect('detalle', {'expediente': expediente});
        //$.redirect('detalle', {'arg1': 'value1', 'arg2': 'value2'});
        //alert($(this).find('td:first').html());
    });

});




