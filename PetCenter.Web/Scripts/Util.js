var glbUtil_ItemsPerPage = [10, 20, 30];
var glbUtil_RowNumber = 10;
var glbUtil_ConfirmOnSubmit = false;
var glbUtil_UpperCaseOnSubmit = false;
var objMessage = null;
var glbUtil_MessageOnSubmit = "Esta seguro de guardar los datos";

$(document).ready(function () {
    fncUtil_FormSubmit();
    fncUtil_ValidateForm();
    fncUtil_Snipp();

    $("input[type=text],textarea,input[type=password]").each(function () {
        $(this).attr('autocomplete', 'off');
    });
});

function fncUtil_FormSubmit() {
    $("#form1").submit(function (e) {
        if (glbUtil_UpperCaseOnSubmit) {
            $("input[type=text],textarea").each(function () {
                $(this).val($(this).val().toUpperCase())
            });
        }
        
        if ($(this).valid()) {
            if (glbUtil_ConfirmOnSubmit) {
                e.preventDefault();
                
                objMessage = new fModalMessage();
                objMessage.message = glbUtil_MessageOnSubmit;
                objMessage.Question = true;
                objMessage.OnAccept = function () {
                    glbUtil_ConfirmOnSubmit = false;
                    $("#form1").trigger('submit');
                };
                objMessage.Open();

                return false;
            }
            else {
                fncUtil_Loading("show");
            }
        }
    });
}

function fncUtil_ValidateForm() {
    try {
        var form = $("#form1")
        , formData = $.data(form[0])
        , settings = formData.validator.settings
        , oldErrorPlacement = settings.errorPlacement
        , oldSuccess = settings.success;

        settings.errorPlacement = function (label, element) {
            oldErrorPlacement(label, element);

            label.parents('.form-group').addClass('has-error');
            label.addClass('text-danger');
        };

        settings.success = function (label) {
            label.parents('.form-group').removeClass('has-error');
            oldSuccess(label);
        };
    }
    catch (ex) {  }
}

function fncUtil_Loading(action) {
    if (action == "show") {
        $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);

        $(".progress-bar").animate({
            width: "100%"
        }, 2500);
    }
    else {
        $(".progress-bar").stop();
    }

    $('#pleaseWaitDialog').modal({ backdrop: 'static', keyboard: false });
    $('#pleaseWaitDialog').modal(action);   
}

function fncUtil_MensajeExito(pstrMensaje) {
    objMessage = new fModalMessage();
    objMessage.message = pstrMensaje;
    objMessage.Ok = true;
    objMessage.Open();
}

function fncUtil_Grid(p_grid, p_listar, p_id, p_colNames, p_colModel, p_pager, p_sortname, p_sortorder, p_onSelectRow, p_ondblClickRow,
    p_footerrow, p_gridComplete, p_pageHeight, p_onCellSelect, p_refreshButton, p_pageWidth, p_multiselect, p_viewrecords,
    p_emptyrecords) {

    //$.jgrid.defaults.width = 780;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    if (!p_refreshButton) p_refreshButton = false;

    if (p_viewrecords == null) p_viewrecords = true;

    if (p_emptyrecords == null) p_emptyrecords = "No hay resultados";

    $(p_grid).jqGrid({
        datatype: function () {
            intPaginaActual = $(p_grid).getGridParam("page");
            p_listar();
        },
        jsonReader: {
            root: "Items",
            page: "CurrentPage",
            total: "PageCount",
            records: "RecordCount",
            repeatitems: false,
            id: p_id
        },
        //styleUI: 'Bootstrap',
        colNames: p_colNames,
        colModel: p_colModel,
        height: p_pageHeight,
        //width: p_pageWidth,
        pager: p_pager,
        loadtext: 'Cargando datos...',
        emptyrecords: p_emptyrecords,
        //rowNum: glbUtil_RowNumber,
        //rowList: glbUtil_ItemsPerPage,
        rowNum: (p_viewrecords ? glbUtil_RowNumber : 0),
        pgbuttons: p_viewrecords,
        pgtext: (!p_viewrecords ? null : "Página {0} de {1}"),
        recordtext: (!p_viewrecords ? null : "Mostrando {0} - {1} de {2}"),
        viewrecords: p_viewrecords,
        rowList: (p_viewrecords ? glbUtil_ItemsPerPage : []),
        sortname: p_sortname,
        sortorder: p_sortorder,
        viewrecords: true,
        gridview: true,
        autowidth: true,
        altRows: true,
        footerrow: p_footerrow,
        multiselect: p_multiselect,
        altclass: 'gridAltClass',
        cmTemplate: { title: false },
        onSelectRow: p_onSelectRow,
        ondblClickRow: p_ondblClickRow,
        gridComplete: p_gridComplete,
        onCellSelect: p_onCellSelect
    });

    jQuery(p_grid).jqGrid('navGrid', p_pager, {
        cloneToTop: false, edit: false, add: false, del: false, search: false, refresh: p_refreshButton,
        refreshtext: "Actualizar"
    });
}

function fncUtil_TimePicker(div, txt, onselect) {
    $(div).datetimepicker({
        locale: 'es',
        format: 'HH:mm'
    });

    $(div).on("dp.change", function (e) {
        if (onselect) onselect();
    });

    $(txt).mask('00:00');

    $(txt).blur(function () {
        fncUtil_ValidarHora(this);
    });
}

function fncUtil_ValidarHora(txt, msg) {
    txt = $(txt);
    var value = fncUtil_GetText(txt.val());
    if (value == "") return true;
    if (msg == null) msg = "Hora no válida";

    //    txt.attr("class", "Input");

    if (value.indexOf(":") > -1) {
        var arr = value.split(":");
        var intHora = parseInt(arr[0]);
        var intMinuto = parseInt(arr[1]);

        if (intHora > 23 || intMinuto > 59) {
            if (parent) objMessage = new parent.fModalMessage();
            else objMessage = new fModalMessage();

            objMessage.message = msg;
            objMessage.Error = true;
            objMessage.OnAccept = function () {
                //                txt.attr("class", "InputError");
                txt.focus();
            }
            objMessage.Open();

            return false;
        }

        return true;
    }

    return false;
}

function fncUtil_GetText(pstrValue) {
    if (pstrValue == null) pstrValue = "";
    return $.trim(pstrValue).toUpperCase();
}

function fncUtil_ShowErrorMessage(pstrMessage) {
    if (parent) objMessage = new parent.fModalMessage();
    else objMessage = new fModalMessage();

    objMessage.message = pstrMessage;
    objMessage.Error = true;
    objMessage.Open();
}

function fncUtil_Snipp() {
    $('.btn-number').click(function (e) {
        e.preventDefault();
        
        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            //alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            //alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }


    });
    $(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

function fncUtil_DatePicker(div, txt, onselect, pmindate) {
    if (pmindate == null) pmindate = new Date();

    $(div).datetimepicker({
        locale: 'es',
        //format: 'DD/MM/YYYY hh:mm a',
        ignoreReadonly: true,
        format: 'DD/MM/YYYY',
        minDate: pmindate
    });

    $(div).on("dp.change", function (e) {
        if (onselect) onselect();
    });

    //$(txt).mask('00/00/0000');

    //$(txt).blur(function () {
        //fncUtil_ValidarFecha(this);
    //});

    //    if (ValidOnBlur) {
    //        $(txt).blur(function () {
    //            var boolResult = fncUtil_ValidarFecha(txt);
    //            if (boolResult && onblur) onblur();
    //        });
    //    }

    //    $(txt).datepicker({
    //        dateFormat: 'dd/mm/yy',
    //        showButtonPanel: true,
    //        numberOfMonths: 1,
    //        changeMonth: true,
    //        changeYear: true,
    //        yearRange: '-90:+0',
    //        showOn: "button",
    //        buttonImage: "../../Images/icons/ico_date.png",
    //        buttonImageOnly: true,
    //        onSelect: onSelect
    //    });

    //    $.datepicker._gotoTodayOriginal = $.datepicker._gotoToday;
    //    $.datepicker._gotoToday = function (id) {
    //        // now, call the original handler
    //        $.datepicker._gotoTodayOriginal.apply(this, [id]);
    //        // invoke selectDate to select the current date and close datepicker.
    //        $.datepicker._selectDate.apply(this, [id]);
    //        if (onSelect) onSelect();
    //    };
}

//function fncUtil_ValidarFecha(id) {
//    var txt = $(id);
//    var boolResult = false;

//    //    txt.attr("class", "Input");

//    try {
//        if (txt.val() == "") {
//            boolResult = true;
//        }
//        else {
//            $.datepicker.parseDate('dd/mm/yy', txt.val());
//            boolResult = true;
//        }
//    }
//    catch (ex) {
//        if (parent) objMessage = new parent.fModalMessage();
//        else objMessage = new fModalMessage();
//        objMessage.message = "Fecha no válida";
//        objMessage.Error = true;
//        objMessage.OnAccept = function () {
//            //            txt.attr("class", "InputError");
//            txt.focus();
//        }
//        objMessage.Open();

//        return false;
//    }

//    return boolResult;
//}

function fncUtil_ParseDate(value) {
    var boolResult = false;
    var datFechaInput = null;

    value = fncUtil_GetText(value);

    if (value.length > 0) {
        var arrValue = value.split("/");

        try {
            datFechaInput = new Date(arrValue[2], parseInt(arrValue[1]) - 1, arrValue[0]);
            boolResult = true;
        }
        catch (ex) {
            boolResult = false;
        }
    }

    return { result: boolResult, dateout: datFechaInput }
}

function fncUtil_OpenModal(modal,modalBody,onshown) {
//function fncUtil_OpenModal(modal,modalBody,htmlBody, onshown) {
    //$(modalBody).html(htmlBody);
    $(modal).modal({ backdrop: 'static', keyboard: false });

    $(modal).on('shown.bs.modal', function (e) {
        if (onshown) onshown();
    });

    $(modal).modal('show');
}

function fncUtil_FormatDate(pdate) {
    return moment(pdate).format('DD/MM/YYYY hh:mm a');
}

function fncUtil_Fecha(pstrFecha) {
    if (pstrFecha == null || pstrFecha == "") return "";

    return pstrFecha.substring(3, 5) + "/" + pstrFecha.substring(0, 2) + "/" + pstrFecha.substring(6, 10);
}

function fncUtil_ValidarRangoFechas(strFromDate, StrToDate, msg, parent) {
    strFromDate = $(strFromDate).val();
    StrToDate = $(StrToDate).val();

    if (strFromDate == "" || StrToDate == "") return true;

    strFromDate = fncUtil_Fecha(strFromDate);
    StrToDate = fncUtil_Fecha(StrToDate);

    var date1 = new Date(strFromDate);
    var date2 = new Date(StrToDate);
    var diff = new Date();

    diff = date2 - date1;

    var days = parseInt(diff / (24 * 60 * 60 * 1000));

    if (days < 0) {
        if (parent) {
            objMessage = new window.parent.fModalMessage();
            objMessage.message = msg;
            objMessage.Error = true;
            objMessage.Open();

            return false;
        }
        else {
            objMessage = new fModalMessage();
            objMessage.message = msg;
            objMessage.Error = true;
            objMessage.Open();

            return false;
        }
    }

    return true;
}