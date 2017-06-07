var rowData = null;

$(document).ready(function () {
    fnc_Click();
    fnc_Grid();

    glbUtil_ConfirmOnSubmit = true;
    glbUtil_MessageOnSubmit = "¿Confirma que desea reservar?";
});

function fnc_Click() {
    $("#btnBuscar").click(function (e) {
        e.preventDefault();

        fncUtil_Loading("show");
        window.location.href = $("#hdnRutaWeb").val() + "Mascota/Busqueda";
    });

    $("#btnReservar").click(function (e) {
        e.preventDefault();

        if (rowData == null) {
            objMessage = new fModalMessage();
            objMessage.message = "Seleccione una mascota";
            objMessage.Warning = true;
            objMessage.Open();

            return;
        }

        fncUtil_Loading("show");
        window.location.href = $("#hdnRutaWeb").val() + "Reserva/LugarReserva/" + rowData.CodigoMascota;
    });

    $("#btnGenerar").click(function (e) {
        //e.preventDefault();

        var lst = $("#jqGrid_lista_A").jqGrid('getRowData');
        if (lst.length == 0) {
            objMessage = new fModalMessage();
            objMessage.message = "Seleccione una mascota";
            objMessage.Warning = true;
            objMessage.OnAccept = function () {
                $("#btnBuscar").focus()
            };
            objMessage.Open();

            e.preventDefault();

            return;
        }

        var intReserva = 0;
        $.each(lst, function (index, value) {
            if (value.CodigoLugar > 0) intReserva++;
        });
        if (intReserva == 0) {
            objMessage = new fModalMessage();
            objMessage.message = "Seleccione lugar";
            objMessage.Warning = true;
            objMessage.OnAccept = function () {
                $("#btnBuscar").focus()
            };
            objMessage.Open();

            e.preventDefault();
        }
    });

    $("#btnCancelar").click(function (e) {
        e.preventDefault();

        fncUtil_Loading("show");
        window.location.href = $("#hdnRutaWeb").val() + "Reserva/Busqueda";
    });
}

function fnc_Grid() {
    var pageHeight = null;
    var pageWidth = null;

    var colNames = ["Codigo Mascota", "CodigoLugar", "Nombre Mascota", "Raza", "Especie", "Desde", "Hasta", "Lugar"];
    var colModel = [
            { name: 'CodigoMascota', hidden: true },
            { name: 'CodigoLugar', hidden: true },
            { name: 'NombreMascota', index: 'NombreMascota', width: 100, sorttype: "string", align: "center" },
            { name: 'NombreRaza', index: 'NombreRaza', width: 100, sorttype: "string", align: "center" },
            { name: 'DescripcionEspecie', index: 'DescripcionEspecie', width: 100, sorttype: "string", align: "center" },
            { name: 'FechaInicio', index: 'FechaInicio', width: 100, sorttype: "date", align: "center", formatter: 'date' },
            { name: 'FechaFin', index: 'FechaFin', width: 100, sorttype: "date", align: "center", formatter: 'date' },
            { name: 'DescripcionLugar', index: 'DescripcionLugar', width: 100, sorttype: "string", align: "center" },
    ];

    fncUtil_Grid("#jqGrid_lista_A", fnc_Listar, "CodigoMascota", colNames, colModel, null, "FechaInicio", "desc",
        function (id) {
            rowData = $("#jqGrid_lista_A").jqGrid('getRowData', id);
            $("#btnReservar").prop("disabled", false);
        }, null, false, null, pageHeight, null, null, pageWidth, false, false);
}

function fnc_Listar() {
    $("#btnReservar").prop("disabled", true);

    fncUtil_Loading("show");

    $("#jqGrid_lista_A").jqGrid("clearGridData", true);
    rowData = null;

    var oAjax = new fAjax();
    oAjax.Url = "Reserva/ListarDetalle";
    //oAjax.Parameters = JSON.stringify(oItem);
    oAjax.OnDone = function (result) {
        fncUtil_Loading("hide");

        jqGrid_lista_A.addJSONData(result);
        $("#jqGrid_lista_A").jqGrid('resetSelection');
    }
    oAjax.Execute();
}