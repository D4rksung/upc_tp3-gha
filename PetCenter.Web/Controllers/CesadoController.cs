using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PetCenter.Web.Models;
using PetCenter.Web.ViewModel;
namespace PetCenter.Web.Controllers
{
    public class CesadoController : Controller
    {
        //
        // GET: /Cesado/

        public ActionResult Index()
        {
            CesadoServiceCliente csc = new CesadoServiceCliente();
            ViewBag.listaCesados=csc.ListaCesados();
            return View();
        }

    }
}
