$(document).ready(function () {
    $.backstretch([
            $("#hdnRutaWeb").val() + "Images/Fondo1.jpg",
            $("#hdnRutaWeb").val() + "Images/Fondo2.jpg",
            $("#hdnRutaWeb").val() + "Images/Fondo3.jpg"
    ], { duration: 7000, fade: 2000 });
});