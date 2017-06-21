//#region $(document).ready(function ()
$(document).ready(function () {
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
    ListarTodasMascotas();

    $('#DetalleMonitoreoMascota').css({ "display": "none" });
})
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
                        alert(data[this.id].codigo);
                        $('#DetalleMonitoreoMascota').css({ "display": "initial" });
                    });
                });
            }
        }
    });
}
//#endregion

//#region ListarTodasMascotas
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
                        //store the information in the next page's data
                        $("#details-page").data("info", data[this.id]);
                        //change the page # to second page. 
                        //Now the URL in the address bar will read index.html#details-page
                        //where #details-page is the "id" of the second page
                        //we're gonna redirect to that now using changePage() method
                        $.mobile.changePage("#details-page");
                    });

                    //refresh list to enhance its styling.
                    //$(this).listview("refresh");
                });
            }
        }
    });
}
//#endregion


