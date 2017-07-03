//#region FormatoFecha
function FormatoFecha(Fecha) {
    var DesdeAno = Fecha.substring(0, 4);
    var DesdeMes = Fecha.substring(4, 6);
    var DesdeDia = Fecha.substring(6, 8);
    Fecha = DesdeDia + "-" + DesdeMes + "-" + DesdeAno;
    return Fecha;
}
//#endregion

//#region Obtener fecha Formato yyyMMddHHmmss
function obtenerFechaFormatoyyyMMddHHmmss() {
    var today = new Date();
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    mintues = checkZero(minutes);
    seconds = checkZero(seconds);
    return year + month + day + hour + minutes + seconds;
}
//#endregion

function checkZero(data) {
    if (data.length == 1) {
        data = "0" + data;
    }
    return data;
}