using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PetCenter.Web.Controllers
{
    public class PlanAlimenticioController : Controller
    {
        //
        // GET: /PlanAlimenticio/

        public ViewResult Index()
        {
            Session["ReservaDatos"] = null;

            return View();
        }

        public ActionResult Index2()
        {
            return View();
        }

    }
}
