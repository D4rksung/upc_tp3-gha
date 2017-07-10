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
    cargaDatosIniciales();
    //#endregion

    //#region Tabs
    $('#btn-add-tab').click(function () {
        tabID++;
        $('#tab-list').append($('<li><a href="#tab' + tabID + '" role="tab" data-toggle="tab">Día ' + tabID + '<button class=\"close" type="button" title="Quitar día">×</button></a></li>'));
        $('#tab-content').append($('<div class=\"tab-pane fade" id="tab' + tabID + '">Día ' + tabID + ' content</div>'));
    });
    $('#tab-list').on('click', '.close', function () {
        var tabID = $(this).parents('a').attr('href');
        $(this).parents('li').remove();
        $(tabID).remove();

        //display first tab
        var tabFirst = $('#tab-list a:first');
        resetTab();
        tabFirst.tab('show');
    });

    var list = document.getElementById("tab-list");

    //#endregion

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

    GenerarSeccionComida('Desayuno');
    ListarCategorias('Desayuno');
    GenerarSeccionComida('Almuerzo');
    ListarCategorias('Almuerzo');
    GenerarSeccionComida('Cena');
    ListarCategorias('Cena');

    $("#cbCategoriasDesayuno").change(function () {
        ListarSubCategorias('Desayuno', $(this).val());
    });

    $("#cbCategoriasAlmuerzo").change(function () {
        ListarSubCategorias('Almuerzo', $(this).val());
    });

    $("#cbCategoriasCena").change(function () {
        ListarSubCategorias('Cena', $(this).val());
    });
});
//#endregion

var button = '<button class=\"close" type="button" title="Remove this page">X</button>';
var tabID = 1;

//#region Resetear Tab
function resetTab() {
    var tabs = $("#tab-list li:not(:first)");
    var len = 1
    $(tabs).each(function (k, v) {
        len++;
        $(this).find('a').html('Día ' + len + button);
    })
    tabID--;
}
//#endregion

//#region Carga Datos Iniciales
function cargaDatosIniciales() {
    $.getJSON("/PlanAlimenticio/listaValoresPorDefectoPlanAlimenticioNuevo", function (data) {

        $.each(data, function (tipo, data) { // Iterates through a collection
            if (tipo == "especies") {
                $("#cbEspecies option").remove(); // Remove all <option> child tags.
                $("#cbEspecies").append("<option value='0'>Seleccionar</option>");
                $.each(data, function (tipo, data) {
                    $("#cbEspecies").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
            if (tipo == "condicionesMedicas") {
                $("#cbCondicionesMedicas option").remove(); // Remove all <option> child tags.
                $("#cbCondicionesMedicas").append("<option value='0'>Seleccionar</option>");
                $.each(data, function (tipo, data) {
                    $("#cbCondicionesMedicas").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
            if (tipo == "razas") {
                $("#cbRazas option").remove(); // Remove all <option> child tags.
                $("#cbRazas").append("<option value='0'>Seleccionar</option>");
                $.each(data, function (tipo, data) {
                    $("#cbRazas").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
            if (tipo == "nivelesBMI") {
                $("#cbNivelesBMI option").remove(); // Remove all <option> child tags.
                $("#cbNivelesBMI").append("<option value='0'>Seleccionar</option>");
                $.each(data, function (tipo, data) {
                    $("#cbNivelesBMI").append( // Append an object to the inside of the select box
                        $("<option ></option>") // Yes you can do this.
                            .text(data.nombre)
                            .val(data.codigo)
                    );
                });
            }
            if (tipo == "etapasVida") {
                $("#cbEtapasVida option").remove(); // Remove all <option> child tags.
                $("#cbEtapasVida").append("<option value='0'>Seleccionar</option>");
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


//#region Creacion de Comidas
function GenerarSeccionComida(titulo) {
    $( "#accordion" ).append("<div class=\"panel panel-default\">"+
        "<div class=\"panel-heading\">"+
        "<h4 class=\"panel-title\">" +
        "<a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse"+titulo+"\">" +
            titulo +
        "</a>" +
        "</h4>" +
        "</div>" +
        "<div id=\"collapse" + titulo + "\" class=\"panel-collapse collapse in\">" +
        GenerarContenidoSeccionComida(titulo)+
        "</div>" +
        "</div>"
        );                                    
}
//#endregion

//#region Generar Contenido de Seccion Comida
function GenerarContenidoSeccionComida(titulo) {
    return "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">" +
    "<div class=\"row col-lg-4 col-md-4 col-sm-4 col-xs-12\">" +
        "<div class=\"input-group\">" +
            "<div class=\"input-group-addon\">Categoria:<font size=\"2\" color=\"red\"> </font></div>" +
            "<select required=\"\" class=\"form-control\" name=\"cbCategorias" + titulo + "\" id=\"cbCategorias" + titulo + "\">" +
                "<option value=\"\">Seleccionar</option>" +
            "</select>" +
        "</div>" +
    "</div>" +
    "<div class=\"row col-lg-2 col-md-2 col-sm-2 col-xs-12\"></div>" +
    "<div class=\"row col-lg-4 col-md-4 col-sm-4 col-xs-12\">" +
        "<div class=\"input-group\">" +
            "<div class=\"input-group-addon\">Subcategoria:<font size=\"2\" color=\"red\"> </font></div>" +
            "<select required=\"\" class=\"form-control\" name=\"cbSubCategorias" + titulo + "\" id=\"cbSubCategorias" + titulo + "\">" +
                "<option value=\"\">Seleccionar</option>" +
            "</select>" +
        "</div>" +
    "</div>" +
    "<div class=\"row col-lg-2 col-md-2 col-sm-2 col-xs-12\"></div>" +
    "<div class=\"row col-lg-1 col-md-1 col-sm-1 col-xs-12\">" +
        "<div class=\"form-group\">" +
            "<div class=\"input-group\">" +
                "<a href=\"#\" id=\"AgregarAlimento\" class=\"btn btn-danger\" role=\"button\">Agregar alimento</a>" +
            "</div>" +
        "</div>" +
    "</div>" +
        "<div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\">" +
    "<div id=\"divAlimentos\" class=\"table-responsive\">" +
        "<table id=\"tblAlimentos\" class=\"table table-striped\">" +
            "<tbody>" +
                "<tr>" +
                    "<th>Nombre</th>" +
                    "<th>Cantidad</th>" +
                    "<th>Uni.Med.</th>" +
                    "<th>Quitar</th>" +
                "</tr>" +
            "</tbody>" +
        "</table>" +
    "</div>" +
"</div>" +
"</div>";
}
//#endregion



//#region ListarCatgorias
function ListarCategorias(comida) {
    //listarCategorias
    var cbCategoria = "#cbCategorias" + comida;
    $.getJSON("/PlanAlimenticio/listarCategorias", function (data) {
        $(cbCategoria+" option").remove(); // Remove all <option> child tags.
        $(cbCategoria).append("<option value='0'>Seleccionar</option>");
        $.each(data, function (tipo, data) { // Iterates through a collection
            $(cbCategoria).append( // Append an object to the inside of the select box
                $("<option ></option>") // Yes you can do this.
                    .text(data.nombre)
                    .val(data.codigo)
            );
        });
    });
}
//#endregion

//#region ListarSubCatgorias
function ListarSubCategorias(comida,categoria) {
    //listarCategorias
    var cbSubCategoria = "#cbSubCategorias" + comida;
    $.getJSON("/PlanAlimenticio/listarSubCategorias/"+categoria, function (data) {
        $(cbSubCategoria + " option").remove(); // Remove all <option> child tags.
        $(cbSubCategoria).append("<option value='0'>Seleccionar</option>");
        $.each(data, function (tipo, data) { // Iterates through a collection
            $(cbSubCategoria).append( // Append an object to the inside of the select box
                $("<option ></option>") // Yes you can do this.
                    .text(data.nombre)
                    .val(data.codigo)
            );
        });
    });
}
//#endregion


listarAlimentosPorSubCategoria

function ListarTodosPlanesAlimenticios(subcategoria) {
    $("#tblPlanesAlimenticios").empty();
    $.ajax({
        cache: false,
        type: 'GET',
        async: false,
        dataType: "json",
        url: '/PlanAlimenticio/listarAlimentosPorSubCategoria/' + subcategoria,
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