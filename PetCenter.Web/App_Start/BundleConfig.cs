using System.Web;
using System.Web.Optimization;

namespace PetCenter.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/bootstrap/css").Include("~/Content/bootstrap/bootstrap*",
                                                                        "~/Content/bootstrap/font-awesome.min.css",
                                                                        "~/Content/bootstrap/BootSideMenu.css"));

            bundles.Add(new StyleBundle("~/Content/site/css").Include("~/Content/Site.css"));

            bundles.Add(new StyleBundle("~/Content/menu/css").Include("~/Content/jquery/jquery.smartmenus.bootstrap.css"));

            bundles.Add(new StyleBundle("~/Content/error/css").Include("~/Content/SiteError.css"));

            bundles.Add(new StyleBundle("~/Content/grid/css").Include("~/Content/jquery/ui.jqgrid-bootstrap.css"));


            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery/jquery.min.js",
                                                                    "~/Scripts/jquery/jquery.backstretch.min.js",
                                                                    "~/Scripts/jquery/jquery.message.js",
                                                                    "~/Scripts/jquery/jquery.mask.js",
                                                                    "~/Scripts/jquery/jquery.ajax.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery/jquery.validate.min.js",
                "~/Scripts/jquery/jquery.validate.unobtrusive.min.js",
                "~/Scripts/jquery/jquery.validate.unobtrusive.custom.js",
                "~/Scripts/jquery/jquery.unobtrusive-ajax.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include("~/Scripts/bootstrap/bootstrap.min.js",
                                                                        "~/Scripts/bootstrap/moment.min.js",
                                                                        "~/Scripts/bootstrap/moment-with-locales.min.js",
                                                                        "~/Scripts/bootstrap/bootstrap-datetimepicker.min.js",
                                                                        "~/Scripts/bootstrap/bootstrap-select.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/siteexterno").Include("~/Scripts/Util.js"));

            bundles.Add(new ScriptBundle("~/bundles/site").Include("~/Scripts/Util.js",
                                                                    "~/Scripts/pages/Layout.js"));

            bundles.Add(new ScriptBundle("~/bundles/menu").Include("~/Scripts/jquery/jquery.smartmenus.min.js",
                                                                    "~/Scripts/jquery/jquery.smartmenus.bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/grid").Include("~/Scripts/jquery/jqgrid/jquery.jqGrid.min.js",
                                                                    "~/Scripts/jquery/jqgrid/grid.locale-es.js"));

            bundles.Add(new ScriptBundle("~/bundles/LugarPlanifica").Include("~/Scripts/pages/Administracion/LugarPlanifica.js"));
            bundles.Add(new ScriptBundle("~/bundles/ReservaBusqueda").Include("~/Scripts/pages/Operaciones/ReservaBusqueda.js"));
            bundles.Add(new ScriptBundle("~/bundles/ClienteBusqueda").Include("~/Scripts/pages/Operaciones/ClienteBusqueda.js"));
            bundles.Add(new ScriptBundle("~/bundles/ReservaRegistro").Include("~/Scripts/pages/Operaciones/ReservaRegistro.js"));
            bundles.Add(new ScriptBundle("~/bundles/MascotaBusqueda").Include("~/Scripts/pages/Operaciones/MascotaBusqueda.js"));
            bundles.Add(new ScriptBundle("~/bundles/LugarReserva").Include("~/Scripts/pages/Operaciones/LugarReserva.js"));
            bundles.Add(new ScriptBundle("~/bundles/HospedajeConReserva").Include("~/Scripts/pages/Operaciones/HospedajeConReserva.js"));
            bundles.Add(new ScriptBundle("~/bundles/HospedajeBusquedaReserva").Include("~/Scripts/pages/Operaciones/HospedajeBusquedaReserva.js"));
            bundles.Add(new ScriptBundle("~/bundles/HospedajeSinReservaBusqueda").Include("~/Scripts/pages/Operaciones/HospedajeSinReservaBusqueda.js"));
            bundles.Add(new ScriptBundle("~/bundles/HospedajeSinReservaRegistro").Include("~/Scripts/pages/Operaciones/HospedajeSinReservaRegistro.js"));

            BundleTable.EnableOptimizations = true;
        }
    }
}