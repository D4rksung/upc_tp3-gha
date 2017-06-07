function fAjax() {
    /*Properties*/
    this.Url = "";
    this.Parameters = "";
    this.Type = "POST";

    /*Methods*/
    this.Execute = fAjax_Execute;

    /*Events*/
    this.OnDone = function () { };
    this.OnComplete = function () { };
}

function fAjax_Execute() {
    var request = $.ajax({
        type: this.Type,
        //crossDomain: true,
        url: $("#hdnRutaWeb").val() + this.Url,
        data: this.Parameters,
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        async: true,
    });

    request.done(this.OnDone);
    request.complete(this.OnComplete);
}

$.ajaxSetup({
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        if (parent) parent.fncUtil_Loading("hide");
        else fncUtil_Loading("hide");

        if (parent) objMessage = new parent.fModalMessage();
        else objMessage = new fModalMessage();
        objMessage.Error = true;
        objMessage.message = "Ocurrió un inconveniente, por favor contactarse con el administrador";
        objMessage.Open();
    }
});