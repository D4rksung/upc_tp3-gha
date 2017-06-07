var CargaInicial = true;
var rowData = null;
var rowData_B = null;

$(document).ready(function () {
    fnc_Click();
    fnc_Grid();
    fnc_Grid_B();
});

function fnc_Click() {
    $("#btnBuscar").click(function (e) {
        e.preventDefault();

        fnc_Listar();
    });

    $("#btnAceptar").click(function (e) {
        $("#CodigoReserva").val(rowData_B.CodigoReserva)
        $("#FechaInicio").val(rowData_B.FechaInicio);
        $("#FechaFin").val(rowData_B.FechaFin);
        $("#EstadoReserva").val(rowData_B.EstadoReserva);
        $("#NombreMascota").val(rowData_B.NombreMascota);
        $("#NombreCliente").val(rowData.NombreCliente);

        $("#CodigoCliente").val(rowData.CodigoCliente);
        $("#CodigoMascota").val(rowData_B.CodigoMascota);
        $("#CodigoLugar").val(rowData_B.CodigoLugar);
    });

    $("#btnCancelar").click(function (e) {
        e.preventDefault();

        fncUtil_Loading("show");
        window.location.href = $("#hdnRutaWeb").val() + "Hospedaje/ConReserva";
    });
}

function fnc_Grid() {
    var pageHeight = null;
    var pageWidth = null;

    var colNames = ["Código", "Apellidos y Nombres", "Dirección"];
    var colModel = [
            { name: 'CodigoCliente', hidden: true },
            { name: 'NombreCliente', index: 'NombreCliente', width: 100, sorttype: "string", align: "center" },
            { name: 'DireccionCliente', index: 'DireccionCliente', width: 100, sorttype: "string", align: "center" },
    ];

    fncUtil_Grid("#jqGrid_lista_A", fnc_Listar, "CodigoCliente", colNames, colModel, "#jqGrid_pager_A", "NombreCliente", "asc",
        function (id) {
            rowData = $("#jqGrid_lista_A").jqGrid('getRowData', id);
            fnc_Listar_B();
        }, null, false, null, pageHeight, null, null, pageWidth, false, true, "No existen resultados para la búsqueda");
}

function fnc_Listar() {
    $("#btnAceptar").prop("disabled", true);

    if (CargaInicial) {
        CargaInicial = false;
        return;
    }

    fncUtil_Loading("show");

    var oItem = {};
    oItem.PageSize = $("#jqGrid_lista_A").getGridParam("rowNum");
    oItem.CurrentPage = $("#jqGrid_lista_A").getGridParam("page");
    oItem.SortColumn = $("#jqGrid_lista_A").getGridParam("sortname");
    oItem.SortOrder = $("#jqGrid_lista_A").getGridParam("sortorder");
    oItem.NombreCliente = $("#NombreCliente").val();

    $("#jqGrid_lista_A").jqGrid("clearGridData", true);
    rowData = null;

    $("#jqGrid_lista_B").jqGrid("clearGridData", true);
    rowData_B = null;

    var oAjax = new fAjax();
    oAjax.Url = "Cliente/Listar";
    oAjax.Parameters = JSON.stringify(oItem);
    oAjax.OnDone = function (result) {
        fncUtil_Loading("hide");

        jqGrid_lista_A.addJSONData(result);
        $("#jqGrid_lista_A").jqGrid('resetSelection');
    }
    oAjax.Execute();
}

function fnc_Grid_B() {
    var pageHeight = null;
    var pageWidth = null;

    var colNames = ["Código", "CodigoMascota", "CodigoLugar", "Mascota", "Inicio", "Fin", "EstadoReserva"];
    var colModel = [
            { name: 'CodigoReserva', hidden: true },
            { name: 'CodigoMascota', hidden: true },
            { name: 'CodigoLugar', hidden: true },
            { name: 'NombreMascota', index: 'NombreMascota', width: 100, sorttype: "string", align: "center" },
            { name: 'FechaInicio', index: 'FechaInicio', width: 100, sorttype: "date", align: "center", formatter: 'date' },
            { name: 'FechaFin', index: 'FechaFin', width: 100, sorttype: "date", align: "center", formatter: 'date' },
            { name: 'EstadoReserva', hidden: true },
    ];

    fncUtil_Grid("#jqGrid_lista_B", fnc_Listar_B, "CodigoReserva", colNames, colModel, "#jqGrid_pager_B", "FechaInicio", "asc", 
        function (id) {
            rowData_B = $("#jqGrid_lista_B").jqGrid('getRowData', id);
            $("#btnAceptar").prop("disabled", false);
        }, null, false, null, pageHeight, null, null, pageWidth, false, true, "No existen resultados para la búsqueda");
}

function fnc_Listar_B() {
    $("#btnAceptar").prop("disabled", true);

    if (rowData == null) return;

    fncUtil_Loading("show");

    var oItem = {};
    oItem.PageSize = $("#jqGrid_lista_B").getGridParam("rowNum");
    oItem.CurrentPage = $("#jqGrid_lista_B").getGridParam("page");
    oItem.SortColumn = $("#jqGrid_lista_B").getGridParam("sortname");
    oItem.SortOrder = $("#jqGrid_lista_B").getGridParam("sortorder");
    oItem.CodigoCliente = rowData.CodigoCliente;
    oItem.EstadoReserva = 1;

    $("#jqGrid_lista_B").jqGrid("clearGridData", true);
    rowData_B = null;

    var oAjax = new fAjax();
    oAjax.Url = "Reserva/ListarFechaActual";
    oAjax.Parameters = JSON.stringify(oItem);
    oAjax.OnDone = function (result) {
        fncUtil_Loading("hide");

        jqGrid_lista_B.addJSONData(result);
        $("#jqGrid_lista_B").jqGrid('resetSelection');
    }
    oAjax.Execute();
}