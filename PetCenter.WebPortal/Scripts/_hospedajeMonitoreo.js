/**
 * @fileoverview Monitoreo de Mascota
 *
 * @version                               1.2
 *
 * @author              Luis Chumpitaz <chumpisc@gmail.com>
 * @copyright           TP3-PetCenter
 *
 * History
 * v2.2 – Se mejoró el efecto de expansión de los submenús dándole efecto aceleración
 * v2.0 – Se evitó que quedaran supersupuestos textos de submenús
 * v1.1 – Se mejoró la compatibilidad con navegadores Opera
 * ----
 * La primera versión de aprMenu fue Luis Chumpitaz
**/


//#region $(document).ready
$(document).ready(function () {

    //#region Inicializaciones
    $('#divDetalleMonitoreoMascota').css({ "display": "none" });
    $("#divSeccionVideo").css({ "display": "none" });
    $('#divCapturasRealizadasMonitoreo').css({ "display": "none" });
    ListarTodasMascotas();
    $("#RegistrarMonitoreo").attr('disabled', 'true');
    $("#DetenerMonitoreo").attr('disabled', 'true');
    
    $("#snap").attr('disabled', 'true');
    $("#txtObservacionesMonitoreo").attr('readonly', 'true');
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
        context.drawImage(video, 0, 0, 500, 400);
        //TODO: terminar de agrgar fotos en local para grabar.
    });
    //#endregion

    //#region Acciones de los botones
    $("#IniciarMonitoreo").click(function () {
        event.preventDefault();
        $("#IniciarMonitoreo").attr('disabled', 'true');
        $("#DetenerMonitoreo").removeAttr("disabled");
        $("#RegistrarMonitoreo").removeAttr("disabled");
        $("#txtObservacionesMonitoreo").removeAttr('readonly');
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
    $("#modal_RegistrarCaptura").click(function () {
        event.preventDefault();
        var nFilas = $("#tblCapturasRealizadaMonitoreo tr").length;
        if (nFilas > 3) {
            alert('No puedes agregar más de 3 capturas para un monitoreo');
        }
        else {
            agregarCaptura(nFilas);
        }
        
    });
    //#endregion
});
//#endregion

//#region ListarTodasMascotas
/**

 * Descripción

 * @method ListarTodasMascotas

 * @param Parámetro A

 * @return Devuelve un lista de mascotas que pueden ser monitoreadas el día actual con un formato HTML y CSS

 */
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
                $('#divDetalleMonitoreoMascota').css({ "display": "initial" });
                $('#divCapturasRealizadasMonitoreo').css({ "display": "none" });
            });
        });
    });
}
//#endregion

//#region ListarMascotasPorFiltro
/**

 * Descripción

 * @method ListarMascotasPorFiltro

 * @param filtro String

 * @return Devuelve una lista de mascotas según un filtro de búsqueda que pueden ser monitoreadas el día actual con un formato HTML y CSS

 */
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
                        $('#divDetalleMonitoreoMascota').css({ "display": "initial" });
                        $('#divCapturasRealizadasMonitoreo').css({ "display": "none" });
                    });
                });
            }
        }
    });
}
//#endregion

//#region obtenerDatosMascota
/**

 * Descripción

 * @method obtenerDatosMascota

 * @param mascota Integer

 * @return Devuelve los atributos de una mascota para mostrarlos en los label respectivos

 */
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
            $('#divDetalleMonitoreoMascota').css({ "display": "none" });
        }
    });
}
//#endregion

//#region ListarMonitoreosPorMascota
/**

 * Descripción

 * @method ListarMonitoreosPorMascota

 * @param lugarHospedaje Integer
 
 * @param mascota Integer

 * @return Devuelve la lista de monitoreos asociados a una mascota y a un hospedaje específico.

 */
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

//#region ListarCapturasPorMonitoreo
/**

 * Descripción

 * @method ListarMonitoreosPorMascota

 * @param lugarHospedaje Integer
 
 * @param mascota Integer

 * @return Devuelve la lista de monitoreos asociados a una mascota y a un hospedaje específico.

 */
function ListarCapturasPorMonitoreo(monitoreo) {
    $("#tblCapturasMonitoreo").empty();
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: '/Monitoreo/listaCapturasMonitoreos/' + monitoreo,
        success: function (data, textStatus) {
            if (textStatus == "success") {
                if (data != null && $.isArray(data)) {
                    if (data.length > 0) {
                        $("#totalCapturas").html("Se encontraron " + data.length + " capturas");
                        $("#tblCapturasMonitoreo").append("<tbody><tr>"
                            + "<th>Fecha Hora</th>"
                            + "<th>Captura</th>"
                            + "</tr></tbody>"
                            )

                        /* Recorremos tu respuesta con each */
                        $.each(data, function (index, value) {
                            var nombreImagenCaptura = "imagenCaptura" + index;
                            /* Vamos agregando a nuestra tabla las filas necesarias */
                            $("#tblCapturasMonitoreo").append("<tr><td>"
                                + value.fechaRegistro + "</td><td>"
                                + "<img id=" + nombreImagenCaptura + " width='250' heigth='250' alt='' /></td>"
                                + "</tr>");

                            $("#" + nombreImagenCaptura).attr('src', 'data:image/png;base64,' + value.contenido);
                        });
                    }
                    else {
                        $("#totalCapturas").html("No hay capturas disponibles");
                    }
                }
                else {
                    $("#totalCapturas").html("No hay capturas disponible");
                }
            }
        }
    });
}
//#endregion



    //#region registrarMonitoreo
    /**
    
     * Descripción
    
     * @method ListarMonitoreosPorMascota
    
     * @param lugarHospedaje Integer
     
     * @param mascota Integer
    
     * @return Devuelve la lista de monitoreos asociados a una mascota y a un hospedaje específico.
    
     */
function registrarMonitoreo(lugarHospedaje, mascota, observaciones) {

    registrarCapturasParaMonitoreo();
        //var jsonObject = {
        //    "codigo": 0,
        //    "lugarHospedaje": lugarHospedaje,
        //    "mascota": mascota,
        //    "observaciones": observaciones,
        //    "fechaRegistro":""
        //};
        //$.ajax({
        //    //cache: false,
        //    type: 'POST',
        //    contentType: "application/json; charset=utf-8",
        //    //async: false,

        //    url: '/Monitoreo/registrarMonitoreo',
        //    data: JSON.stringify(jsonObject),
        //    dataType: "json",
        //    success: function (data, textStatus) {
        //        if (textStatus == "success") {
        //            ListarMonitoreosPorMascota(lugarHospedaje, mascota);
        //            $('#txtObservacionesMonitoreo').val('');
        //            $("#IniciarMonitoreo").removeAttr("disabled");
        //            $("#DetenerMonitoreo").attr('disabled', 'true');
        //            $("#RegistrarMonitoreo").attr('disabled', 'true');
        //            $("#snap").attr('disabled', 'true');
        //            DetenerMonitoreo();
        //            alert("Se registró correctamente");
        //        }
        //    },
        //    error: function (xhr) {
        //        alert(xhr);
        //    }
        //});
    }
    //#endregion

    //#region registrar capturas en Monitoreo
    function registrarCapturasParaMonitoreo() {
        var numeroCapturasRealizadas = $("#tblCapturasRealizadaMonitoreo tr").length - 1;
        if (numeroCapturasRealizadas > 0) {
            var listaCapturasRealizadas = [];
            $("#tblCapturasRealizadaMonitoreo tbody tr").each(function (index) {
                if (index > 0) {
                    
                    var nombreArchivoCapturaRealizada;
                    $(this).children("td").each(function (index2) {
                        switch (index2) {
                            case 0: nombreArchivoCapturaRealizada = $(this).text();
                                break;
                        }
                    })
                    listaCapturasRealizadas.push(nombreArchivoCapturaRealizada);
                }
            })
            //TODO: convertir a Base64 como String y enviarlo como param Contenido.
            for (var ele in listaCapturasRealizadas) {
                alert(listaCapturasRealizadas[ele]);
            }
        }


    }
    //#endregion

    //#region Agregar Captura a lista 
    function agregarCaptura(posicion) {
        var nombreArchivo = obtenerNombreArchivoCaptura(posicion);
        var dataURL = canvas.toDataURL();
        dataURL = dataURL.replace('data:image/png;base64,', '')
        var jsonObject = {
            "param1": nombreArchivo,
            "param2": dataURL
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/Monitoreo/subirCaptura",
            data: JSON.stringify(jsonObject),
            dataType: "json",
            error: function (xhr) {
                alert(xhr);
            }
        }).done(function (data) {
            $('#divCapturasRealizadasMonitoreo').css({ "display": "initial" });
            $("#tblCapturasRealizadaMonitoreo")
                .append("<tr><td>" + nombreArchivo + "</td><td><a>Ver captura</a></td></tr>");
        });
    }
    //#endregion

    //#region ObtenerNombreArchivoCaptura
    function obtenerNombreArchivoCaptura(posicion) {
        return obtenerFechaFormatoyyyMMddHHmmss()+"_" + posicion + ".jpg";
    }
    //#endregion


    //#region IniciarMonitoreo
    function IniciarMonitoreo() {
        $("#divSeccionVideo").css({ "display": "initial" });
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
        $("#divSeccionVideo").css({ "display": "none" });
        video.pause();
        video.src = "";
        //localStream.getVideoTracks()[0].stop();

    }
    //#endregion

