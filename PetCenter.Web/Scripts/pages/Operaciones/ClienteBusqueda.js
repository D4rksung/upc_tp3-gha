var CargaInicial = true;
var rowData = null;

$(document).ready(function () {
    fnc_Click();
    fnc_Grid();
});

function fnc_Click() {
    $("#btnBuscar").click(function (e) {
        e.preventDefault();

        fnc_Listar();
    });

    $("#btnAceptar").click(function (e) {
        $("#CodigoCliente").val(rowData.CodigoCliente)
        $("#NombreCliente").val(rowData.NombreCliente);
        $("#DireccionCliente").val(rowData.DireccionCliente);
    });

    $("#btnCancelar").click(function (e) {
        e.preventDefault();

        fncUtil_Loading("show");
        //window.location.href = $("#hdnRutaWeb").val() + "Reserva/Busqueda";
        history.back();
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
            $("#btnAceptar").prop("disabled", false);
        }, function (id) {
            rowData = $("#jqGrid_lista_A").jqGrid('getRowData', id);
            $("#btnAceptar").prop("disabled", false);
            $("#btnAceptar").click();
        }, false, null, pageHeight, null, null, pageWidth,false,true,"No existen resultados para la búsqueda");
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

    var oAjax = new fAjax();
    oAjax.Url = "Cliente/Listar";
    oAjax.Parameters = JSON.stringify(oItem);
    oAjax.OnDone = function (result) {
        fncUtil_Loading("hide");

        jqGrid_lista_A.addJSONData(result);
        $("#jqGrid_lista_A").jqGrid('resetSelection');

        rowData = null;
    }
    oAjax.Execute();
}