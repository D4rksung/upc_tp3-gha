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
    var x = $(location).attr('pathname');
    //#region Inicializaciones
    cargaDatosIniciales();
    //#endregion
    $('#btnAdd').click(function (e) {
        var nextTab = $('#tabs li').size() + 1;

        // create the tab
        $('<li><a href="#tab' + nextTab + '" data-toggle="tab">Tab ' + nextTab + '</a></li>').appendTo('#tabs');

        // create the tab content
        $('<div class="tab-pane" id="tab' + nextTab + '">tab' + nextTab + ' content</div>').appendTo('.tab-content');

        // make the new tab active
        $('#tabs a:last').tab('show');
    });


    $("#BuscarPlanesAlimenticios").click(function () {
        event.preventDefault();
        var filtro = $('#txtNombrePlanAlimenticio').val();
        var especie = $('select[name=cbEspecies]').val();
        var condicionMedica = $('select[name=cbCondicionesMedicas]').val();
        if (filtro.trim().length > 0) {
            ListarPlanesAlimenticiosPorFiltro(filtro,especie,condicionMedica);
        } else {
            ListarTodosPlanesAlimenticios(especie,condicionMedica);
        }
    });
});
//#endregion


//#region Carga Datos Iniciales
function cargaDatosIniciales() {
    $.getJSON("/PlanAlimenticio/listaValoresPorDefectoPlanAlimenticioNuevo", function (data) {
        $("#cbEspecies option").remove(); // Remove all <option> child tags.
        $("#cbEspecies").append("<option value='0'>Todos</option>");
        $.each(data, function (tipo, data) { // Iterates through a collection
            if (tipo == "especies") {
                $.each(data, function (tipo, data) {
                    $("#cbEspecies").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
            if (tipo == "condicionesMedicas") {
                $.each(data, function (tipo, data) {
                    $("#cbCondicionesMedicas").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
            if (tipo == "razas") {
                $.each(data, function (tipo, data) {
                    $("#cbRazas").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
            if (tipo == "nivelesBMI") {
                $.each(data, function (tipo, data) {
                    $("#cbNivelesBMI").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
            if (tipo == "etapasVida") {
                $.each(data, function (tipo, data) {
                    $("#cbEtapasVida").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
        });
    });
}
//#endregion




//#region ListarEspecies
/**

 * Descripción

 * @method ListarTodasMascotas

 * @param Parámetro A

 * @return Devuelve un lista de mascotas que pueden ser monitoreadas el día actual con un formato HTML y CSS

 */
function ListarEspecies() {
    $.getJSON("/PlanAlimenticio/listaEspecies", function (data) {
        $("#cbEspecies option").remove(); // Remove all <option> child tags.
        $("#cbEspecies").append("<option value='0'>Todos</option>");
        $.each(data, function (i, data) { // Iterates through a collection
            $("#cbEspecies").append( // Append an object to the inside of the select box
                $("<option ></option>") // Yes you can do this.
                    .text(data.nombre)
                    .val(data.codigo)
            );
        });
    });
}
//#endregion

//#region ListarCondicionesMedicas
/**

 * Descripción

 * @method ListarTodasMascotas

 * @param Parámetro A

 * @return Devuelve un lista de mascotas que pueden ser monitoreadas el día actual con un formato HTML y CSS

 */
function ListarCondicionesMedicas() {
    $.getJSON("/PlanAlimenticio/listaCondicionesMedicas", function (data) {
        $("#cbCondicionesMedicas option").remove(); // Remove all <option> child tags.
        $("#cbCondicionesMedicas").append("<option value='0'>Todos</option>");
        $.each(data, function (i, data) { // Iterates through a collection
            $("#cbCondicionesMedicas").append( // Append an object to the inside of the select box
                $("<option></option>") // Yes you can do this.
                    .text(data.nombre)
                    .val(data.codigo)
            );
        });
    });
}
//#endregion

//#region ListarTodosPlanesAlimenticios
/**

 * Descripción

 * @method ListarPlanesAlimenticiosPorFiltro

 * @param filtro String

 * @return Devuelve una lista de mascotas según un filtro de búsqueda que pueden ser monitoreadas el día actual con un formato HTML y CSS

 */
function ListarTodosPlanesAlimenticios(especie, condicionMedica) {
    $("#tblPlanesAlimenticios").empty();
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: '/PlanAlimenticio/listarTodosPlanesAlimenticios/' + especie + "/" + condicionMedica,
        success: function (data, textStatus) {
            if (textStatus == "success") {
                if (data != null && $.isArray(data)) {
                    if (data.length > 0) {
                        $("#totalRegPlanesAlimenticios").html("Se encontraron " + data.length + " registros");
                        $("#tblPlanesAlimenticios").append("<tbody><tr>"
                            + "<th> Fecha de Registro</th>"
                            + "<th>Nombre</th>"
                            + "<th>Especie</th>"
                            + "<th>Condición Médica</th>"
                            + "<th>Acciones</th>"
                            + "</tr></tbody>"
                            )

                        /* Recorremos tu respuesta con each */
                        $.each(data, function (index, value) {
                            /* Vamos agregando a nuestra tabla las filas necesarias */
                            $("#tblPlanesAlimenticios").append("<tr><td>"
                                + value.fechaRegistro + "</td><td>"
                                + value.nombre + "</td><td>"
                                + value.especie + "</td><td>"
                                + value.condicionMedica + "</td><td>"
                                + "<a href=\"#\" role=\"button\" data-toggle=\"modal\" data-target=\"#capturas-modal\" onclick=\"ListarCapturasPorMonitoreo(" + value.codigo + ");\">Ver</a></td></tr>");
                        });
                    }
                    else {
                        $("#totalRegPlanesAlimenticios").html("No hay información disponible");
                    }
                }
                else {
                    $("#totalRegPlanesAlimenticios").html("No hay información disponible");
                }
            }
        }
    });
}
//#endregion

//#region ListarPlanesAlimenticiosPorFiltro
/**

 * Descripción

 * @method ListarPlanesAlimenticiosPorFiltro

 * @param filtro String

 * @return Devuelve una lista de mascotas según un filtro de búsqueda que pueden ser monitoreadas el día actual con un formato HTML y CSS

 */
function ListarPlanesAlimenticiosPorFiltro(filtro, especie, condicionMedica) {
    $("#tblPlanesAlimenticios").empty();
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: '/PlanAlimenticio/listarPlanesAlimenticiosPorFiltro/' + filtro + '/' + especie + '/' + condicionMedica,
        success: function (data, textStatus) {
            if (textStatus == "success") {
                if (data != null && $.isArray(data)) {
                    if (data.length > 0) {
                        $("#tblPlanesAlimenticios").append("<tbody><tr>"
                            + "<th >Fecha de Registro</th>"
                            + "<th>Nombre</th>"
                            + "<th>Especie</th>"
                            + "<th>Condición Médica</th>"
                            + "<th>Acciones</th>"
                            + "</tr></tbody>"
                            )

                        /* Recorremos tu respuesta con each */
                        $.each(data, function (index, value) {
                            $("#totalRegPlanesAlimenticios").html("Se encontraron " + data.length + " registros");
                            /* Vamos agregando a nuestra tabla las filas necesarias */
                            $("#tblPlanesAlimenticios").append("<tr><td>"
                                + value.fechaRegistro + "</td><td>"
                                + value.nombre + "</td><td>"
                                + value.especie + "</td><td>"
                                + value.condicionMedica + "</td><td>"
                                + "<a href=\"#\" role=\"button\" data-toggle=\"modal\" data-target=\"#capturas-modal\" onclick=\"ListarCapturasPorMonitoreo(" + value.codigo + ");\">Ver</a></td></tr>");
                        });
                    }
                    else {
                        $("#totalRegPlanesAlimenticios").html("No hay información disponible");
                    }
                }
                else {
                    $("#totalRegPlanesAlimenticios").html("No hay información disponible");
                }
            }
        }
    });
}
//#endregion

