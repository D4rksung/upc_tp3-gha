var objModalActive;

function fModalMessage()
{
    /*Properties*/
    this.message = "";
    this.Error = false;
    this.Ok = false;
    this.Question = false;
    this.Warning = false;
    this.title = "Pet Center"
	
	/*Methods*/
	this.Open = fModalMessage_Open;
	
	/*Events*/
	this.OnAccept = function () { };
	this.OnCancel = function () { };
}

var objMessageActive = null;
function fModalMessage_Open() {
    var icon = "";

    if (this.Ok == true) icon = "fa-info-circle";
    else if (this.Error == true) icon = "fa-times-circle";
    else if (this.Question == true) icon = "fa-question-circle";
    else if (this.Warning == true) icon = "fa-exclamation-circle";

    var html = '<div id="ModalMessage" class="modal fade" role="dialog" style="z-index:1500 !important">';
    //var html = '<div id="ModalMessage" class="modal fade" role="dialog">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';

    html += '<div class="modal-header">';
    html += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
    html += '<h4 class="modal-title"><i class="fa fa-bell"></i> ' + this.title + '</h4>';
    html += '</div>';

    html += '<div class="modal-body">';
    html += '<div class="row">';
    html += '<div class="col-sm-10">' + this.message + '</div>'
    html += '<div class="col-sm-2" style="text-align:right;font-size:33px;">' + '<i class="fa ' + icon + '"></i>' + '</div>'
    html += '</div>';
    html += '</div>';

    html += '<div class="modal-footer">';
    html += '<button type="button" id="btnMessageAccept" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Aceptar</button>';
    if (this.Question) {
        html += '<button type="button" id="btnMessageCancel" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancelar</button>';
    }
    html += '</div>';

    html += '</div>';
    html += '</div>';
    html += '</div>';

    $("#ModalContainer").html(html);

    $('#ModalMessage').on('shown.bs.modal', function (e) {
        //var zIndex = 1040 + (10 * $('.modal:visible').length);
        //$(this).css('z-index', zIndex);
        //setTimeout(function () {
        //    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        //}, 0);

        setTimeout(function () {
            $("#btnMessageAccept").focus();
        }, 300);
    });
    
    $('#ModalMessage').modal({ backdrop: 'static', keyboard: false });
    $("#ModalMessage").modal('show');

    objMessageActive = this;

    $("#btnMessageAccept").click(function () {
        $('#ModalMessage').on('hidden.bs.modal', function (e) {
            objMessageActive.OnAccept();
        });

        $("#ModalMessage").modal('hide');
    });
}

