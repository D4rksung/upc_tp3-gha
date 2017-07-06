using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Drawing;
using System.Text;
using System.Web.Script.Serialization;
using System.Web.Mvc;
using PetCenter.WebPortal.Models;
namespace PetCenter.WebPortal.Controllers
{
    public class PlanAlimenticioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Nuevo()
        {
            return View();
        }

        #region ListarEspecies
        [HttpGet]
        public JsonResult listaEspecies()
        {
            //listar
            HttpWebRequest req = (HttpWebRequest)WebRequest
                .Create("http://localhost/PetCenter.RESTServices/PlanALimenticioService.svc/PlanAlimenticio/Especies");
            req.Method = "GET";
            HttpWebResponse res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string listaEspeciesJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaEspeciesObtenidas = js.Deserialize<List<GenericoModel>>(listaEspeciesJson);
            var listaEspecies = ListaEspeciesObtenidas;
            //returning josn result  
            return Json(listaEspecies, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ListarCondicionesMedicas
        [HttpGet]
        public JsonResult listaCondicionesMedicas()
        {
            //listar
            HttpWebRequest req = (HttpWebRequest)WebRequest
                .Create("http://localhost/PetCenter.RESTServices/PlanALimenticioService.svc/PlanAlimenticio/CondicionesMedicas");
            req.Method = "GET";
            HttpWebResponse res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string listaEspeciesJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaEspeciesObtenidas = js.Deserialize<List<GenericoModel>>(listaEspeciesJson);
            var listaEspecies = ListaEspeciesObtenidas;
            //returning josn result  
            return Json(listaEspecies, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}