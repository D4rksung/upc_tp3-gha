var CargaInicial = true;
var rowData = null;

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
        e.preventDefault();

        var lstMascota = $("#jqGrid_lista_B").jqGrid("getGridParam", "selarrrow");

        if (lstMascota.length == 0) {
            objMessage = new fModalMessage();
            objMessage.message = "Seleccione al menos una mascota";
            objMessage.Warning = true;
            objMessage.Open();

            return;
        }

        var lstReserva = [];
        $.each(lstMascota, function (index, value) {
            var row = $("#jqGrid_lista_B").jqGrid('getRowData', value);
            lstReserva.push(row);
        });

        fncUtil_Loading("show");

        var oItem = {};
        oItem.CodigoCliente = rowData.CodigoCliente;
        oItem.NombreCliente = rowData.NombreCliente;
        oItem.DireccionCliente = rowData.DireccionCliente;
        oItem.lstReserva = lstReserva;

        var oAjax = new fAjax();
        oAjax.Url = $("#Controlador").val() + "/GenerarSesion";
        oAjax.Parameters = JSON.stringify(oItem);
        oAjax.OnDone = function (result) {
            if (result.length == 0) {
                window.location.href = $("#hdnRutaWeb").val() + $("#Controlador").val() + "/" + $("#Accion").val();
            }
            else {
                fncUtil_Loading("hide");

                objMessage = new fModalMessage();
                objMessage.message = result;
                objMessage.Warning = true;
                objMessage.OnAccept = function () {
                    $("#btnAceptar").focus()
                };
                objMessage.Open();
            }
        }
        oAjax.Execute();
    });

    $("#btnCancelar").click(function (e) {
        e.preventDefault();

        fncUtil_Loading("show");
        //window.location.href = $("#hdnRutaWeb").val() + "Reserva/Registro";
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
            fnc_Listar_B();
        }, null, false, null, pageHeight, null, null, pageWidth, false, true, "No existen resultados para la búsqueda");
}

function fnc_Listar() {
    //$("#btnAceptar").prop("disabled", true);

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

function fnc_Grid_B() {
    var pageHeight = null;
    var pageWidth = null;

    var colNames = ["Código", "Nombre Mascota", "Raza", "Especie"];
    var colModel = [
            { name: 'CodigoMascota', hidden: true },
            { name: 'NombreMascota', index: 'NombreMascota', width: 100, sorttype: "string", align: "center" },
            { name: 'NombreRaza', index: 'NombreRaza', width: 100, sorttype: "string", align: "center" },
            { name: 'DescripcionEspecie', index: 'DescripcionEspecie', width: 100, sorttype: "string", align: "center" },
    ];

    fncUtil_Grid("#jqGrid_lista_B", fnc_Listar_B, "CodigoMascota", colNames, colModel, "#jqGrid_pager_B", "NombreMascota", "asc",
        //function (id, status) {
        //    rowData = $("#jqGrid_lista_A").jqGrid('getRowData', id);
        //    alert(rowData.status);
        //},
        null,null, false, null, pageHeight, null, null, pageWidth, true, false, "No existen resultados de mascota asociada");
}

function fnc_Listar_B() {
    //$("#btnAceptar").prop("disabled", true);
    if (rowData == null) return;

    fncUtil_Loading("show");

    var oItem = {};
    oItem.PageSize = $("#jqGrid_lista_B").getGridParam("rowNum");
    oItem.CurrentPage = $("#jqGrid_lista_B").getGridParam("page");
    oItem.SortColumn = $("#jqGrid_lista_B").getGridParam("sortname");
    oItem.SortOrder = $("#jqGrid_lista_B").getGridParam("sortorder");
    oItem.CodigoCliente = rowData.CodigoCliente;

    $("#jqGrid_lista_B").jqGrid("clearGridData", true);

    var oAjax = new fAjax();
    oAjax.Url = "Mascota/Listar";
    oAjax.Parameters = JSON.stringify(oItem);
    oAjax.OnDone = function (result) {
        fncUtil_Loading("hide");

        jqGrid_lista_B.addJSONData(result);
        $("#jqGrid_lista_B").jqGrid('resetSelection');
    }
    oAjax.Execute();
}