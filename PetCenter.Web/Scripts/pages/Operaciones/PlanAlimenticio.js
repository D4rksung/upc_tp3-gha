var Planifica = false;

$(document).ready(function () {
    fnc_Grid();
    fnc_Click();

    glbUtil_ConfirmOnSubmit = true;
    glbUtil_MessageOnSubmit = "Confirma la programación";
});

function fnc_Grid() {
    var pageHeight = null;
    var pageWidth = null;

    var colNames = ["Código", "Lugar", "Fecha", "Estado"];
    var colModel = [
            { name: 'CodigoLugarEstado', hidden: true },
            { name: 'DescripcionLugar', index: 'DescripcionLugar', width: 100, sorttype: "string", align: "center" },
            { name: 'FechaDia', index: 'FechaDia', width: 100, sorttype: "date", align: "center", formatter: 'date' },
            { name: 'Estado_lugar', index: 'Estado_lugar', align: 'center', width: 100 },
    ];

    fncUtil_Grid("#jqGrid_lista_A", fnc_Listar, "CodigoLugarEstado", colNames, colModel, "#jqGrid_pager_A", "FechaDia", "asc", null, null, false, null, pageHeight, null, null, pageWidth);
}

function fnc_Listar() {
    fncUtil_Loading("show");

    var oItem = {};
    oItem.PageSize = $("#jqGrid_lista_A").getGridParam("rowNum");
    oItem.CurrentPage = $("#jqGrid_lista_A").getGridParam("page");
    oItem.SortColumn = $("#jqGrid_lista_A").getGridParam("sortname");
    oItem.SortOrder = $("#jqGrid_lista_A").getGridParam("sortorder");
    oItem.Periodo = $("#Periodo").val();

    $("#jqGrid_lista_A").jqGrid("clearGridData", true);
    rowData = null;

    var oAjax = new fAjax();
    oAjax.Url = "Lugar/Listar";
    oAjax.Parameters = JSON.stringify(oItem);
    oAjax.OnDone = function (result) {
        fncUtil_Loading("hide");

        jqGrid_lista_A.addJSONData(result);
        $("#jqGrid_lista_A").jqGrid('resetSelection');

        if (result.Items.length == 0) {
            $('#btnProgramar').prop('disabled', false);
        }
        else {
            $('#btnProgramar').prop('disabled', true);

            if (Planifica) {
                objMessage = new fModalMessage();
                objMessage.message = "Periodo ya existe";
                objMessage.Warning = true;
                objMessage.OnAccept = function () {
                    $("#Periodo").focus()
                };
                objMessage.Open();

                Planifica = false;
            }
        }
    }
    oAjax.Execute();
}

function fnc_Click() {
    $("#btnValidar").click(function (e) {
        e.preventDefault();

        Planifica = true;

        fnc_Listar();
    });
}