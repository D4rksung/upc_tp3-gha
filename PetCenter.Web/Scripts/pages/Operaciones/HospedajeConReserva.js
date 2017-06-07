var rowData = null;

$(document).ready(function () {
    fnc_Click();
    fnc_Grid();

    if ($("#NombreMascota").val().length == 0) $("#btnGenerar").prop("disabled", true);

    glbUtil_ConfirmOnSubmit = true;
    glbUtil_MessageOnSubmit = "¿Desea continuar con la generación de hospedaje?";
});

function fnc_Click() {
    $("#btnBuscar").click(function (e) {
        e.preventDefault();

        fncUtil_Loading("show");
        window.location.href = $("#hdnRutaWeb").val() + "Hospedaje/BusquedaReserva";
    });

    $("#btnEliminar").click(function (e) {
        e.preventDefault();

        fnc_Delete();
    });
}

function fnc_Grid() {
    var pageHeight = null;
    var pageWidth = null;

    var colNames = ["Código","CodigoEstado", "Mascota", "Cliente", "Inicio", "Fin", "Estado"];
    var colModel = [
            { name: 'CodigoHospedaje', hidden: true },
            { name: 'EstadoHospedaje', hidden: true },
            { name: 'NombreMascota', index: 'NombreMascota', width: 100, sorttype: "string", align: "left" },
            { name: 'NombreCliente', index: 'NombreCliente', width: 100, sorttype: "string", align: "left" },
            { name: 'FechaInicio', index: 'FechaInicio', width: 100, sorttype: "date", align: "center", formatter: 'date' },
            { name: 'FechaFin', index: 'FechaFin', width: 100, sorttype: "date", align: "center", formatter: 'date' },
            { name: 'DescripcionEstado', index: 'DescripcionEstado', width: 100, sorttype: "string", align: "center" },
    ];

    fncUtil_Grid("#jqGrid_lista_A", fnc_Listar, "CodigoHospedaje", colNames, colModel, "#jqGrid_pager_A", "FechaInicio", "asc", 
        function (id) {
            rowData = $("#jqGrid_lista_A").jqGrid('getRowData', id);
            $("#btnEliminar").prop("disabled", false);
            if (rowData.EstadoHospedaje == 2) $("#btnEliminar").prop("disabled", true);
        }, null, false, null, pageHeight, null, null, pageWidth, false, true);
}

function fnc_Listar() {
    $("#btnEliminar").prop("disabled", true);

    if ($("#NombreMascota").val().length == 0) return;

    fncUtil_Loading("show");

    var oItem = {};
    oItem.PageSize = $("#jqGrid_lista_A").getGridParam("rowNum");
    oItem.CurrentPage = $("#jqGrid_lista_A").getGridParam("page");
    oItem.SortColumn = $("#jqGrid_lista_A").getGridParam("sortname");
    oItem.SortOrder = $("#jqGrid_lista_A").getGridParam("sortorder");
    oItem.CodigoCliente = $("#CodigoCliente").val();
    //oItem.BuscarPorReserva = true;

    $("#jqGrid_lista_A").jqGrid("clearGridData", true);
    rowData = null;

    var oAjax = new fAjax();
    oAjax.Url = "Hospedaje/Listar";
    oAjax.Parameters = JSON.stringify(oItem);
    oAjax.OnDone = function (result) {
        fncUtil_Loading("hide");

        jqGrid_lista_A.addJSONData(result);
        $("#jqGrid_lista_A").jqGrid('resetSelection');

        rowData = null;
    }
    oAjax.Execute();
}

function fnc_Delete() {
    objMessage = new fModalMessage();
    objMessage.message = "¿Desea continuar con anulación de servicio?";
    objMessage.Question = true;
    objMessage.OnAccept = function () {
        fncUtil_Loading("show");

        var oItem = {};
        oItem.CodigoHospedaje = rowData.CodigoHospedaje;

        var oAjax = new fAjax();
        oAjax.Url = "Hospedaje/Anular";
        oAjax.Parameters = JSON.stringify(oItem);
        oAjax.OnDone = function (result) {
            fncUtil_Loading("hide");

            if (result == true) {
                objMessage = new fModalMessage();
                objMessage.message = "Se realizó anulación de hospedaje con éxito";
                objMessage.Ok = true;
                objMessage.OnAccept = fnc_Listar;
                objMessage.Open();
            }
        }
        oAjax.Execute();
    };
    objMessage.Open();
}