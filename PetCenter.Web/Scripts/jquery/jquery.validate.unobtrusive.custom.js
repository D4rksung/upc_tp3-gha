$.validator.addMethod("requiredif", function (value, element, params) {
    var ctrl = "#" + params.dependentproperty;
    if (value == null) value = "";
    if ($(ctrl).val() == params.targetvalue) return (value != "" && value != "0");
    return true;
});
$.validator.unobtrusive.adapters.add("requiredif", ["dependentproperty", "targetvalue"], function (options) {
    options.rules["requiredif"] = options.params;
    options.messages["requiredif"] = options.message;
});

$.validator.addMethod("requirediflist", function (value, element, params) {
    var ctrl = "#" + params.dependentproperty;
    if (value == null) value = new Array();
    if ($(ctrl).val() == params.targetvalue) return (value.length > 0);
    return true;
});
$.validator.unobtrusive.adapters.add("requirediflist", ["dependentproperty", "targetvalue"], function (options) {
    options.rules["requirediflist"] = options.params;
    options.messages["requirediflist"] = options.message;
});

$.validator.addMethod("requiredvalues", function (value, element, params) {
    var arrItems = params.targetvalues.split(params.delimiterchar);
    return (arrItems.indexOf(value) > -1);
});
$.validator.unobtrusive.adapters.add("requiredvalues", ["targetvalues", "delimiterchar"], function (options) {
    options.rules["requiredvalues"] = options.params;
    options.messages["requiredvalues"] = options.message;
});

$.validator.addMethod("rangeif", function (value, element, params) {
    var ctrl = "#" + params.dependentproperty;
    if ($(ctrl).val() == params.targetvalue) {
        if (value == null) value = "0";
        var intValue = parseInt(value)
        return (intValue >= params.minvalue && intValue <= params.maxvalue);
    }
    return true;
});
$.validator.unobtrusive.adapters.add("rangeif", ["dependentproperty", "targetvalue","minvalue","maxvalue"], function (options) {
    options.rules["rangeif"] = options.params;
    options.messages["rangeif"] = options.message;
});

//$.validator.addMethod("requireddate", function (value, element, params) {
//    var oResult = fncUtil_ParseDate(value);
//    if (!oResult.result) return false;

//    var ctrl = "#" + params.dependentproperty;
//    var intCodigo = parseInt($(ctrl).val());

//    if (intCodigo == 0 && params.validcurrentdate == "True") {
//        var oResultToday = fncUtil_ParseDate(params.currentdate);
//        if (!oResultToday.result || oResult.dateout < oResultToday.dateout) return false;
//    }

//    return true;
//});
//$.validator.unobtrusive.adapters.add("requireddate", ["dependentproperty", "validcurrentdate", "currentdate"], function (options) {
//    options.rules["requireddate"] = options.params;
//    options.messages["requireddate"] = options.message;
//});

$.validator.methods.date = function (value, element) {
    if (this.optional(element)) {
        return true;
    }

    var ok = true;

    //moment.locale("es");
    //var result = moment(value).format('DD-MM-YYYY hh:mm')
    //if (result == "Invalid date") ok = false;
    //alert(value)
    //alert(result)
    //try {
    //    $.datepicker.parseDate('dd/mm/yy', value);
    //}
    //catch (err) {
    //    ok = false;
    //}
    return ok;
}

//$.validator.addMethod('date',
//    function (value, element, params) {
//        if (this.optional(element)) {
//            return true;
//        }

//        var ok = true;

//        var result = moment(value).format('DD-MM-YYYY hh:mm')
//        if(result == "Invalid date") ok = false;
//        //try {
//        //    $.datepicker.parseDate('dd/mm/yy', value);
//        //}
//        //catch (err) {
//        //    ok = false;
//        //}
//        return ok;
//    });
//});