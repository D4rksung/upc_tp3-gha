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
using System.Configuration;
using PetCenter.WebPortal.Models;
namespace PetCenter.WebPortal.Controllers
{
    public class MonitoreoController : Controller
    {
        #region Variables
        private string endpointPetCenter;
        #endregion

        #region Constructor
        public MonitoreoController()
        {
            endpointPetCenter = ConfigurationManager.AppSettings["endpointPetCenterRestServicesMonitoreo"];
        }
        #endregion

        public ActionResult Index()
        {
            return View();
        }

        #region ListarMascotas
        [HttpGet]
        public JsonResult listaMascotas()
        {
            string operacion = "Monitoreo/Mascotas/Todas/6";
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<MascotaHospedadaModel> ListaResultado = js.Deserialize<List<MascotaHospedadaModel>>(resultadoJSON);
            var resultado = ListaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region listaMascotasPorFiltro
        [HttpGet]
        public JsonResult listaMascotasPorFiltro(string param1)
        {
            string operacion =string.Format("Monitoreo/Mascotas/{0}/6",param1);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<MascotaHospedadaModel> ListaResultado = js.Deserialize<List<MascotaHospedadaModel>>(resultadoJSON);
            var resultado = ListaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region obtenerDatosMascota
        [HttpGet]
        public JsonResult obtenerDatosMascota(string param1)
        {
            string operacion = string.Format("Monitoreo/Mascota/{0}", param1);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            InformacionMascotaModel informacionMascota = js.Deserialize<InformacionMascotaModel>(resultadoJSON);
            var resultado = informacionMascota;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region listaMonitoreosMascota
        [HttpGet]
        public JsonResult listaMonitoreosMascota(string param1, string param2)
        {
            string operacion = string.Format("Monitoreos/{0}/{1}", param1, param2);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<MonitoreoMascotaModel> listaResultado = js.Deserialize<List<MonitoreoMascotaModel>>(resultadoJSON);
            var resultado = listaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region listaCapturasMonitoreos
        [HttpGet]
        public JsonResult listaCapturasMonitoreos(string param1)
        {
            string operacion = string.Format("Monitoreo/fotos/{0}", param1);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<FotoMonitoreoModel> listaResultado = js.Deserialize<List<FotoMonitoreoModel>>(resultadoJSON);
            var resultado = listaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region RegistrarMonitoreo
        [HttpPost]
        public JsonResult registrarMonitoreo(MonitoreoMascotaModel param1)
        {
            string operacion = "Monitoreo";
            string postdata = "{\"codigo\":0,\"lugarHospedaje\":" +param1.lugarHospedaje + ",\"mascota\":" + param1.mascota + ",\"observaciones\":\"" + param1.observaciones + "\"}";
            string resultadoJson = _Util.ObtenerResultadoJSONPOST(postdata, string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            MonitoreoMascotaModel monitoreoCreado = js.Deserialize<MonitoreoMascotaModel>(resultadoJson);
            var resultado = monitoreoCreado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region RegistrarFotoMonitoreo
        [HttpPost]
        public JsonResult registrarFotoMonitoreo(FotoMonitoreoModel param1)
        {
            string operacion = "Monitoreo/Foto";
            string postdata = "{\"codigo\":0,\"monitoreo\":" + param1.monitoreo + ",\"nombre\":\"" + param1.nombre + "\"}";
            string resultadoJson = _Util.ObtenerResultadoJSONPOST(postdata, string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            FotoMonitoreoModel fotoMonitoreoCreado = js.Deserialize<FotoMonitoreoModel>(resultadoJson);
            var resultado = fotoMonitoreoCreado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region SubirCaptura
        [HttpPost]
        public JsonResult subirCaptura(string param1,string  param2)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(param2);
            // Convert byte[] to Image
            using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                Image image = Image.FromStream(ms, true);
                image.Save(Server.MapPath(string.Format("~/Content/capturas/{0}", param1)));
            }
            //returning josn result 
            var resultado = "OK"; 
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}