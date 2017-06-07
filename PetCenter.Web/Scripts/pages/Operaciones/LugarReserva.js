$(document).ready(function () {
    fnc_DatePicker();
    fnc_Click();
});

function fnc_DatePicker() {
    var mindate = new Date(fncUtil_Fecha($("#FechaInicio").val()));
    //if ($("#Controlador").val() == "Reserva") mindate.setDate(mindate.getDate()+2);    

    fncUtil_DatePicker("#dtFechaInicio", "#FechaInicio", null, mindate);
    fncUtil_DatePicker("#dtFechaFin", "#FechaFin", null, mindate);
}

function fnc_Click() {
    $("#btnBuscar").click(function (e) {
        e.preventDefault();

        if (!fncUtil_ValidarRangoFechas("#FechaInicio", "#FechaFin","Fechas incorrectas")) return;

        fncUtil_Loading("show");

        var oItem = {};
        //oItem.FechaInicio = fncUtil_Fecha($("#FechaInicio").val());
        //oItem.FechaFin = fncUtil_Fecha($("#FechaFin").val());
        oItem.FechaInicio = $("#FechaInicio").val();
        oItem.FechaFin = $("#FechaFin").val();

        $("#jqGrid_lista_A").jqGrid("clearGridData", true);
        rowData = null;

        var oAjax = new fAjax();
        oAjax.Url = "Lugar/ListarDisponibilidad";
        oAjax.Parameters = JSON.stringify(oItem);
        oAjax.OnDone = function (result) {
            fncUtil_Loading("hide");
            var html = "";
            var cssbutton = "";
            var intOcupado = 0;

            $.each(result.Items, function (index, value) {
                if (index % 8 == 0) {
                    if (index > 0) html += "</div>";
                    html += '<div class="form-group form-group-md">';
                }
                
                if (value.Estado_lugar == "1") cssbutton = "btn-danger";
                else cssbutton = "btn-success";

                var onclick = "";

                if (value.Estado_lugar == "0") {
                    onclick = 'onclick=fnc_Seleccionar(' + value.CodigoLugar + ',"' + value.DescripcionLugar + '")';
                }
                else {
                    onclick = 'onclick="return false;"';
                    intOcupado++;
                }

                html += '<div class="col-md-1"><button class="btn ' + cssbutton + '" ' + onclick + '><span class="glyphicon glyphicon-check"></span> ' + value.DescripcionLugar + '</button></div>';
            });

            if (intOcupado == result.Items) {
                objMessage = new fModalMessage();
                objMessage.message = "No existen lugares disponibles";
                objMessage.Warning = true;
                objMessage.OnAccept = function () {
                    $("#btnBuscar").focus()
                };
                objMessage.Open();
            }

            $("#ContenidoLugar").html(html);
        }
        oAjax.Execute();
    });

    $("#btnSalir").click(function (e) {
        e.preventDefault();

        fncUtil_Loading("show");
        window.location.href = $("#hdnRutaWeb").val() + "Reserva/Registro";
    });
}

function fnc_Seleccionar(CodigoLugar, DescripcionLugar) {
    $("#CodigoLugar").val(CodigoLugar);
    $("#DescripcionLugar").val(DescripcionLugar);
}