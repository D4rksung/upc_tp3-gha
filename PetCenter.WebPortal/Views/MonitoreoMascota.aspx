<%@ Page Title="" Language="C#" MasterPageFile="~/Views/commons/Layout.Master" AutoEventWireup="true" CodeBehind="MonitoreoMascota.aspx.cs" Inherits="PetCenter.WebPortal.Views.MonitoreoMascota" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<script src="<%= ResolveClientUrl("~/Controllers/MonitoreoController.js") %>" type="text/javascript"></script>
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="box">
      <div class="contenido-ficha">
                            <section>
                                <h1 class="text-center">Monitoreo de Mascota </h1>
          </section>
                    <div id="myModal_total_formularios" >
                
        </div>
          
          </div>
          </div>
    </div>
    <br /><br />
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div id="MisMascotas" class="row list-group">

                <div class="item  col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding:0px 2px 0px 2px;">
        <div data-role="page" id="info-page">
                <div data-role="header" data-theme="b">
                     <h2> Mis mascotas</h2>
                </div>
                  <div class="input-group stylish-input-group">
                        <input type="text" name="txtBusquedaMascotas" id="txtBusquedaMascotas" class="form-control" placeholder="Ingrese nombre de mascota o nombre de cliente" />
                         
                        <span class="input-group-addon">
                            <button id="BuscarMascota" formnovalidate="formnovalidate" type="submit">
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                    </div>
                <div data-role="content">
                    <ul data-role="listview" id="prof-list" data-divider-theme="a" data-inset="true">
                    </ul>
                </div>
        </div>

    </div>

            </div>
    </div>

    
   <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">

    <div id="DetalleMonitoreoMascota" class="box">
      <div class="contenido-ficha">
                            <section>
                            <h2>Detalle y gestión de monitoreo de mascota</h2>
                            </section>
 <div class="item  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                           <fieldset class="scheduler-border">
                               <legend class="scheduler-border">Datos de Mascota</legend>
                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtCodigoMascota"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Código:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtCodigoMascota" name="txtCodigoMascota" value="">
                                  </div>
                                </div>
                                </div>
                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtNombreMascota"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Nombre:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtNombreMascota" name="txtNombreMascota" value="">
                                  </div>
                                </div>
                                </div>
                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtRazaMascota"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Raza:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtRazaMascota" name="txtRazaMascota" value="">
                                  </div>
                                </div>
                                </div>

                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtEspecieMascota"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Especie:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtEspecieMascota" name="txtEspecieMascota" value="">
                                  </div>
                                </div>
                                </div>

                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtTamanioMascota"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Tamaño:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtTamanioMascota" name="txtTamanioMascota" value="">
                                  </div>
                                </div>
                                </div>
                           </fieldset>
                               
                           <fieldset class="scheduler-border">
                               <legend class="scheduler-border">Hospedaje</legend>
                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtHabitacionMascota"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Habitación:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtHabitacionMascota" name="txtHabitacionMascota" value="">
                                  </div>
                                </div>
                                </div>
                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtFechaIngresoMascota"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Ingreso:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtFechaIngresoMascota" name="txtFechaIngresoMascota" value="">
                                  </div>
                                </div>
                                </div>
                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtFechaSalidaMascota"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Salida:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtFechaSalidaMascota" name="txtFechaSalidaMascota" value="">
                                  </div>
                                </div>
                                </div>

                           </fieldset>     
     
                           <fieldset class="scheduler-border">
                               <legend class="scheduler-border">Cliente</legend>
                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtCodigoCliente"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Código:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtCodigoCliente" name="txtCodigoCliente" value="">
                                  </div>
                                </div>
                                </div>
                                <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                  <label class="sr-only" for="txtNombreCliente"></label>
                                  <div class="input-group">
                                    <div class="input-group-addon">Nombre:</div>
                                    <input type="text" maxlength="100" class="form-control" required="" disabled="" id="txtNombreCliente" name="txtNombreCliente" value="">
                                  </div>
                                </div>
                                </div>
                                

                           </fieldset>           
          </div>

   <div class="item  col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                 <ul class="tabs">
                            <li><a href="#tab1">Monitoreo</a></li>
                            <li><a href="#tab2">Historial de monitoreos</a></li>
                          </ul>
                          <div class="clr"></div>
                          <section class="block">
                            <article id="tab1">
                                <br /><br />
                              <button>Iniciar</button>
                                <button>Detener</button>
                                <button>Tomar Captura</button>
                            </article>
                            <article id="tab2">
                                <br /><br />
                                        <section>
                                            <div class="panel panel-success">
                                                <div class="panel-heading">
                                                    <h3 class="panel-title">Monitoreos realizados</h3>
                                                </div>
                                                <div class="panel-body">
                                                    <div id="table-responsive" class="table-responsive">

                                                        <table id="tblCalendario" name="tblCalendario" class="table table-striped">
                                                            <tbody><tr>
                                                    <th>Calendario</th>
                                                    <th>Especie</th>
                                                    <th>Fecha Inicio</th>
                                                    <th>Fecha Fin</th>
                                                    <th>Opciones</th>
                                                    </tr></tbody>
                    
                                                </table>
                                                        <div id="totalReg"></div>
                                                         <div id="paginacion" >
                                                                
                                                             </div>
                                                </div>
                                                </div>
                                                </div>
                                                </section>

                            </article>
                          </section>

   </div>                          

 </div>
                                
                                
                                   </div>
     </div>

</asp:Content>
