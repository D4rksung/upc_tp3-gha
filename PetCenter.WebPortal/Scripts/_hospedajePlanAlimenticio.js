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
    ListarEspecies();
    ListarCondicionesMedicas();
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

});
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
        $("#cbEspecies").append("<option>Todos</option>");
        $.each(data, function (i, data) { // Iterates through a collection
            $("#cbEspecies").append( // Append an object to the inside of the select box
                $("<option></option>") // Yes you can do this.
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
        $("#cbCondicionesMedicas").append("<option>Todos</option>");
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
