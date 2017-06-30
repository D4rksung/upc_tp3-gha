using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Text;
using System.Web.Script.Serialization;
using System.Web.Mvc;
using PetCenter.WebPortal.Models;
namespace PetCenter.WebPortal.Controllers
{
    public class MonitoreoController : Controller
    {
        // GET: Monitoreo
        public ActionResult Index()
        {
            return View();
        }


        #region ListarMascotas
        [HttpGet]
        public JsonResult listaMascotas()
        {
            //listar
            HttpWebRequest req = (HttpWebRequest)WebRequest
                .Create("http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo/Mascotas/Todas/6");
            req.Method = "GET";
            HttpWebResponse res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string mascotasHospedadasJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<MascotaHospedadaModel> ListaMascotasObtenidas = js.Deserialize<List<MascotaHospedadaModel>>(mascotasHospedadasJson);
            var listaMascotas = ListaMascotasObtenidas;
            //returning josn result  
            return Json(listaMascotas, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region listaMascotasPorFiltro
        [HttpGet]
        public JsonResult listaMascotasPorFiltro(string param1)
        {
            //listar
            HttpWebRequest req = (HttpWebRequest)WebRequest
                .Create(string.Format("http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo/Mascotas/{0}/6", param1));
            req.Method = "GET";
            HttpWebResponse res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string mascotasHospedadasJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<MascotaHospedadaModel> ListaMascotasObtenidas = js.Deserialize<List<MascotaHospedadaModel>>(mascotasHospedadasJson);
            var listaMascotas = ListaMascotasObtenidas;
            //returning josn result  
            return Json(listaMascotas, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region obtenerDatosMascota
        [HttpGet]
        public JsonResult obtenerDatosMascota(string param1)
        {
            //listar
            HttpWebRequest req = (HttpWebRequest)WebRequest
                .Create(string.Format("http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo/Mascota/{0}", param1));
            req.Method = "GET";
            HttpWebResponse res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string mascotaJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            InformacionMascotaModel informacionMascota = js.Deserialize<InformacionMascotaModel>(mascotaJson);
            var mascota = informacionMascota;
            //returning josn result  
            return Json(mascota, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region listaMonitoreosMascota
        [HttpGet]
        public JsonResult listaMonitoreosMascota(string param1, string param2)
        {
            //listar
            HttpWebRequest req = (HttpWebRequest)WebRequest
                .Create(string.Format("http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreos/{0}/{1}", param1, param2));
            req.Method = "GET";
            HttpWebResponse res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string monitoreosJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<MonitoreoMascotaModel> listaMonitoreosMascota = js.Deserialize<List<MonitoreoMascotaModel>>(monitoreosJson);
            var resultado = listaMonitoreosMascota;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region RegistrarMonitoreo
        [HttpPost]
        public JsonResult registrarMonitoreo(MonitoreoMascotaModel param1)
        {
            
            string postdata = "{\"codigo\":0,\"lugarHospedaje\":" +param1.lugarHospedaje + ",\"mascota\":" + param1.mascota + ",\"observaciones\":\"" + param1.observaciones + "\"}";
            byte[] data = Encoding.UTF8.GetBytes(postdata);
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo");
            req.Method = "POST";
            req.ContentLength = data.Length;
            req.ContentType = "application/json";
            var reqStream = req.GetRequestStream();
            reqStream.Write(data, 0, data.Length);
            var res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string monitoreoJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            MonitoreoMascotaModel monitoreoCreado = js.Deserialize<MonitoreoMascotaModel>(monitoreoJson);
            var resultado = monitoreoCreado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region RegistrarFotoMonitoreo
        [HttpPost]
        public JsonResult registrarFotoMonitoreo(FotoMonitoreoModel param1)
        {

            string postdata = "{\"codigo\":0,\"lugarHospedaje\":" + param1.lugarHospedaje + ",\"mascota\":" + param1.mascota + ",\"observaciones\":\"" + param1.observaciones + "\"}";
            byte[] data = Encoding.UTF8.GetBytes(postdata);
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo");
            req.Method = "POST";
            req.ContentLength = data.Length;
            req.ContentType = "application/json";
            var reqStream = req.GetRequestStream();
            reqStream.Write(data, 0, data.Length);
            var res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string fotoMonitoreoJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            FotoMonitoreoModel fotoMonitoreoCreado = js.Deserialize<FotoMonitoreoModel>(fotoMonitoreoJson);
            var resultado = fotoMonitoreoCreado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}