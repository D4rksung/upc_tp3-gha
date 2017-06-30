
//#region $(document).ready
$(document).ready(function () {

    //#region Inicializaciones
    $('#DetalleMonitoreoMascota').css({ "display": "none" });
    ListarTodasMascotas();
    $("#RegistrarMonitoreo").attr('disabled', 'true');
    $("#DetenerMonitoreo").attr('disabled', 'true');
    $("#snap").attr('disabled', 'true');
    //#endregion

    //#region Tabs
    $('ul.tabs li:first').addClass('active');
    $('.block article').hide();
    $('.block article:first').show();
    $('ul.tabs li').on('click', function () {
        $('ul.tabs li').removeClass('active');
        $(this).addClass('active')
        $('.block article').hide();
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).show();
        return false;
    });
    //#endregion

    //#region Snapshot: Elements for taking the snapshot
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function () {
        event.preventDefault();
        context.drawImage(video, 0, 0, 400, 300);
        //TODO: terminar de agrgar fotos en local para grabar.
    });
    //#endregion

    //#region Acciones de los botones
    $("#IniciarMonitoreo").click(function () {
        event.preventDefault();
        $("#IniciarMonitoreo").attr('disabled', 'true');
        $("#DetenerMonitoreo").removeAttr("disabled");
        $("#RegistrarMonitoreo").removeAttr("disabled");
        $("#snap").removeAttr("disabled");
        IniciarMonitoreo();
    });

    $("#DetenerMonitoreo").click(function () {
        event.preventDefault();
        $("#IniciarMonitoreo").removeAttr("disabled");
        $("#DetenerMonitoreo").attr('disabled', 'true');
        $("#RegistrarMonitoreo").removeAttr("disabled");
        $("#snap").attr('disabled', 'true');
        DetenerMonitoreo();
    });

    $("#BuscarMascota").click(function () {
        event.preventDefault();
        var filtro = $('#txtBusquedaMascotas').val();
        if (filtro.trim().length > 0) {
            ListarMascotasPorFiltro(filtro);
        } else {
            ListarTodasMascotas();
        }
    });

    $("#modal_RegistrarMonitoreo").click(function () {
        event.preventDefault();
        var hospedaje = $('#txtCodigoHospedaje').val();
        var mascota = $('#txtCodigoMascota').val();
        var observaciones = $('#txtObservacionesMonitoreo').val();

        if (observaciones.trim().length > 0) {
            registrarMonitoreo(hospedaje, mascota, observaciones);
        } else {
            alert("Debe ingresar una observación");
        }
    });
    var contadorCapturas = 0;
    $("#modal_RegistrarCaptura").click(function () {
        event.preventDefault();
        contadorCapturas++;
        var nombreArchivo = "20170627203000" + contadorCapturas + ".jpg";
        $("#tblCapturasRealizadaMonitoreo").append("<tr><td>"
            + nombreArchivo
            + "</td><td></tr>");
        if (contadorCapturas > 3) alert('No puedes agregar más de 3 capturas para un monitoreo');
    });
    //#endregion
});
//#endregion

//#region ListarTodasMascotas
function ListarTodasMascotas() {
    $.getJSON("/Monitoreo/listaMascotas", function (data) {
        var textoHTML = "";
        $("div.misMascotas-container").html('');

        var tr;
        $.each(data, function (i, data) {
            textoHTML += '<div class="item  col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding:5px 10px 10px 20px;"><div class="caption">' +
            '<h4 class="group inner list-group-item-heading"><a href="#" id="' + i + '" class="info-go">' + data.mascota + '</a></h4>' +
            '<p class="group inner list-group-item-text">Cliente: ' + data.cliente + '</p>' +
            '<p class="group inner list-group-item-text">Fecha de Ingreso:' + FormatoFecha(data.fechaIngreso) + '</p>' +
            '</div></div>';
        });
        $("div.misMascotas-container").append(textoHTML).promise().done(function () {
            $(this).on("click", ".info-go", function (e) {
                e.preventDefault();
                obtenerDatosMascota(data[this.id].codigo);
                $('#DetalleMonitoreoMascota').css({ "display": "initial" });
            });
        });
    });
}
//#endregion

//#region ListarMascotasPorFiltro
function ListarMascotasPorFiltro(filtro) {
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: '/Monitoreo/listaMascotasPorFiltro/'+filtro,
        success: function (data, textStatus) {
            if (textStatus == "success") {
                var textoHTML = "";
                $("div.misMascotas-container").html('');
                $.each(data, function (i, data) {
                    textoHTML += '<div class="item  col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding:5px 10px 10px 20px;"><div class="caption">' +
                    '<h4 class="group inner list-group-item-heading"><a href="#" id="' + i + '" class="info-go">' + data.mascota + '</a></h4>' +
                    '<p class="group inner list-group-item-text">Cliente: ' + data.cliente + '</p>' +
                    '<p class="group inner list-group-item-text">Fecha de Ingreso:' + FormatoFecha(data.fechaIngreso) + '</p>' +
                    '</div></div>';
                });
                $("div.misMascotas-container").append(textoHTML).promise().done(function () {
                    $(this).on("click", ".info-go", function (e) {
                        e.preventDefault();
                        obtenerDatosMascota(data[this.id].codigo);
                        $('#DetalleMonitoreoMascota').css({ "display": "initial" });
                    });
                });
            }
        }
    });
}
//#endregion

//#region obtenerDatosMascota
function obtenerDatosMascota(mascota) {
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: '/Monitoreo/obtenerDatosMascota/' + mascota,
        success: function (data, textStatus) {
            if (textStatus == "success") {
                if (data != null) {

                    $("#imagenMascota").attr("src", "../Content/fotos/" + data.codigo + ".jpg");

                    $('#txtCodigoMascota').val(data.codigo);
                    $('#txtNombreMascota').val(data.nombre);
                    $('#txtRazaMascota').val(data.raza);
                    $('#txtEspecieMascota').val(data.especie);
                    $('#txtTamanioMascota').val(data.tamanio);
                    $('#txtCodigoHospedaje').val(data.hospedaje);
                    $('#txtTipoHabitacionMascota').val(data.tipoHabitacion);
                    $('#txtHabitacionMascota').val(data.habitacion);
                    $('#txtFechaIngresoMascota').val(FormatoFecha(data.fechaEntrada));
                    $('#txtFechaSalidaMascota').val(FormatoFecha(data.fechaSalida));
                    $('#txtCodigoCliente').val(data.clienteCodigo);
                    $('#txtNombreCliente').val(data.cliente);
                    ListarMonitoreosPorMascota(data.hospedaje, mascota);
                    $("#IniciarMonitoreo").removeAttr("disabled");
                    $("#RegistrarMonitoreo").attr('disabled', 'true');
                    $("#DetenerMonitoreo").attr('disabled', 'true');
                    $("#snap").attr('disabled', 'true');
                    DetenerMonitoreo();
                }
            }
        },
        error: function (xhr) {
            $('#DetalleMonitoreoMascota').css({ "display": "none" });
        }
    });
}
//#endregion

//#region ListarMonitoreosPorMascota
function ListarMonitoreosPorMascota(lugarHospedaje, mascota) {
    $("#tblMonitoreos").empty();
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: '/Monitoreo/listaMonitoreosMascota/' + lugarHospedaje + '/' + mascota,
        success: function (data, textStatus) {
            if (textStatus == "success") {
                if (data != null && $.isArray(data)) {
                    if (data.length > 0) {
                        $("#totalReg").html("Se encontraron " + data.length + " registros");
                        $("#tblMonitoreos").append("<tbody><tr>"
                            + "<th width='100px'>Fecha de Registro</th>"
                            + "<th>Observaciones</th>"
                            + "<th>Capturas</th>"
                            + "</tr></tbody>"
                            )

                        /* Recorremos tu respuesta con each */
                        $.each(data, function (index, value) {
                            /* Vamos agregando a nuestra tabla las filas necesarias */
                            $("#tblMonitoreos").append("<tr><td>"
                                + value.fechaRegistro + "</td><td>"
                                + value.observaciones + "</td><td>"
                                + "<a href=\"#\" role=\"button\" data-toggle=\"modal\" data-target=\"#capturas-modal\" onclick=\"ListarCapturasPorMonitoreo(" + value.codigo + ");\">Ver</a></td></tr>");
                        });
                    }
                    else {
                        $("#totalReg").html("No hay información disponible");
                    }
                }
                else {
                    $("#totalReg").html("No hay información disponible");
                }
            }
        }
    });
}
//#endregion

//#region registrarMonitoreo
function registrarMonitoreo(lugarHospedaje, mascota, observaciones) {
    var jsonObject = {
        "codigo": 0,
        "lugarHospedaje": lugarHospedaje,
        "mascota": mascota,
        "observaciones": observaciones,
        "fechaRegistro":""
    };
    $.ajax({
        //cache: false,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        //async: false,

        url: '/Monitoreo/registrarMonitoreo',
        data: JSON.stringify(jsonObject),
        dataType: "json",
        success: function (data, textStatus) {
            if (textStatus == "success") {
                ListarMonitoreosPorMascota(lugarHospedaje, mascota);
                $('#txtObservacionesMonitoreo').val('');
                $("#IniciarMonitoreo").removeAttr("disabled");
                $("#DetenerMonitoreo").attr('disabled', 'true');
                $("#RegistrarMonitoreo").attr('disabled', 'true');
                $("#snap").attr('disabled', 'true');
                DetenerMonitoreo();
                alert("Se registró correctamente");
            }
        },
        error: function (xhr) {
            alert(xhr);
        }
    });
}
//#endregion


//#region IniciarMonitoreo
function IniciarMonitoreo() {
    // Grab elements, create settings, etc.
    var video = document.getElementById('video');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            video.src = window.URL.createObjectURL(stream);
            localstream = stream;
            video.play();
        });
    }
}
//#endregion

//#region DetenerMonitoreo
function DetenerMonitoreo() {

    video.pause();
    video.src = "";
    //localStream.getVideoTracks()[0].stop();

}
//#endregion

//#region FormatoFecha
function FormatoFecha(Fecha) {
    var DesdeAno = Fecha.substring(0, 4);
    var DesdeMes = Fecha.substring(4, 6);
    var DesdeDia = Fecha.substring(6, 8);
    Fecha = DesdeDia + "-" + DesdeMes + "-" + DesdeAno;
    return Fecha;
}
//#endregion