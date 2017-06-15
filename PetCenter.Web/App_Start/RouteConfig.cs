using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PetCenter.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "PlanAlimenticio", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "Default1",
               url: "{controller}/{action}/{id}/{id2}",
               defaults: new { controller = "Usuario", action = "Index", id = UrlParameter.Optional, id2 = UrlParameter.Optional }
           );
        }
    }
}