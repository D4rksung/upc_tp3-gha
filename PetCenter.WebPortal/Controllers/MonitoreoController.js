//#region $(document).ready(function ()
$(document).ready(function () {

    // Elements for taking the snapshot
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    $("#DetenerMonitoreo").attr('disabled', 'true');
    $("#snap").attr('disabled', 'true');
    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function () {
        event.preventDefault();
        context.drawImage(video, 0, 0, 640, 480);
    });

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

    $("#BuscarMascota").click(function () {
        event.preventDefault();
        $("#prof-list li").remove();
        var filtro = $('#txtBusquedaMascotas').val();
        if (filtro.length > 0) {
            ListarMascotasPorFiltro(filtro);
        } else {
            ListarTodasMascotas();
        }
        
    });

    $("#IniciarMonitoreo").click(function () {
        event.preventDefault();
        $("#IniciarMonitoreo").attr('disabled', 'true');
        $("#DetenerMonitoreo").removeAttr("disabled");
        $("#snap").removeAttr("disabled");
        IniciarMonitoreo();
    });

    $("#DetenerMonitoreo").click(function () {
        event.preventDefault();
        $("#IniciarMonitoreo").removeAttr("disabled");
        $("#DetenerMonitoreo").attr('disabled', 'true');
        $("#snap").attr('disabled', 'true');
        DetenerMonitoreo();
    });
    
    ListarTodasMascotas();

    $('#DetalleMonitoreoMascota').css({ "display": "none" });
})
//#endregion

//#region getMain(dObj)
function getMain(dObj) {
    if (dObj.hasOwnProperty('d'))
        return dObj.d;
    else
        return dObj;
}
//#endregion

//#region ListarTodasMascotas
function ListarTodasMascotas() {
    $.ajax({
        cache:false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: 'http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo/Mascotas/Todas/6',
        success: function (data, textStatus) {
            if (textStatus == "success") {
                var li = "";
                $.each(data, function (i, name) {
                    li += '<li><a href="#" id="' + i + '" class="info-go">' + name.nombre + '</a></li>';
                });
                //append list to ul
                $("#prof-list").append(li).promise().done(function () {
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

//#region ListarMascotasPorFiltro
function ListarMascotasPorFiltro(filtro) {
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: 'http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo/Mascotas/'+filtro+'/6',
        success: function (data, textStatus) {
            if (textStatus == "success") {
                var li = "";
                $("#prof-list li").remove();
                $.each(data, function (i, name) {
                    li += '<li><a href="#" id="' + i + '" class="info-go">' + name.nombre + '</a></li>';
                });
                //append list to ul
                $("#prof-list").append(li).promise().done(function () {
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
        url: 'http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo/Mascota/'+mascota,
        success: function (data, textStatus) {
            if (textStatus == "success") {
                if (data != null) {
                    $('#txtCodigoMascota').val(data.codigo);
                    $('#txtNombreMascota').val(data.nombre);
                    $('#txtRazaMascota').val(data.raza);
                    $('#txtEspecieMascota').val(data.especie);
                    $('#txtTamanioMascota').val(data.tamanio);
                    $('#txtHospedaje').val(data.hospedaje);
                    $('#txtTipoHabitacionMascota').val(data.tipoHabitacion);
                    $('#txtHabitacionMascota').val(data.habitacion);
                    $('#txtFechaIngresoMascota').val(FormatoFecha(data.fechaEntrada));
                    $('#txtFechaSalidaMascota').val(FormatoFecha(data.fechaSalida));
                    $('#txtCodigoCliente').val(data.clienteCodigo);
                    $('#txtNombreCliente').val(data.cliente);
                    ListarMonitoreosPorMascota(data.hospedaje,mascota);
                }
            }
        },
        error: function (xhr) {
            $('#DetalleMonitoreoMascota').css({ "display": "none" });
        }
    });
}
//#endregion

//#region ListarMascotasPorFiltro
function ListarMonitoreosPorMascota(lugarHospedaje, mascota) {
    $("#tblMonitoreos").empty();
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: 'http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreos/' + lugarHospedaje+'/' + mascota,
        success: function (data, textStatus) {
            if (textStatus == "success") {
                if (data != null && $.isArray(data)) {
                    $("#totalReg").html("Se encontraron " + data.length + "Registros");
                    $("#tblMonitoreos").append("<tbody><tr>"
                        +"<th>Código</th>"
                        +"<th>Observaciones</th>"
                        +"<th>Fecha de Registro</th>"
                        +"<th>Capturas</th>"
                        +"</tr></tbody>"
                        )

                    /* Recorremos tu respuesta con each */
                    $.each(data, function (index, value) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $("#tblMonitoreos").append("<tr><td>"
                            + value.codigo + "</td><td>"
                            + value.observaciones + "</td><td>"
                            + value.fechaRegistro + "</td><td>"
                            + "<a href=\"#\" role=\"button\" data-toggle=\"modal\" data-target=\"#capturas-modal\">Ver</a></td></tr>");
                    });
                }
                else {
                    $("#totalReg").val("No hay información disponible");
                }
            }
        }
    });
}
//#endregion


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

    /* Legacy code below: getUserMedia 
    else if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia({ video: true }, function(stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia({ video: true }, function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia({ video: true }, function(stream){
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
    */

}

function DetenerMonitoreo() {

    video.pause();
    video.src = "";
    localStream.getVideoTracks()[0].stop();

}

function FormatoFecha(Fecha) {
    var DesdeAno = Fecha.substring(0, 4);
    var DesdeMes = Fecha.substring(4, 6);
    var DesdeDia = Fecha.substring(6, 8);
    Fecha = DesdeDia + "-" + DesdeMes + "-" + DesdeAno;
    return Fecha;
}

