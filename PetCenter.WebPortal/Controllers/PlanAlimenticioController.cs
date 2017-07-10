using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Web.Mvc;
using PetCenter.WebPortal.Models;
namespace PetCenter.WebPortal.Controllers
{
    public class PlanAlimenticioController : Controller
    {
        #region Variables
        private string endpointPetCenter;
        #endregion

        #region Constructor
        public PlanAlimenticioController()
        {
            endpointPetCenter = ConfigurationManager.AppSettings["endpointPetCenterRestServicesPlanAlimenticio"];
        }
        #endregion

        #region Acciones
        public ActionResult Index()
        {
            return View();

            //http://petcenternodejs.azurewebsites.net/
        }

        public ActionResult Nuevo()
        {
            return View();
        }
        #endregion

        #region ListarPlanesAlimenticiosPorFiltro
        [HttpGet]
        public JsonResult listarPlanesAlimenticiosPorFiltro(string param1, string param2, string param3) {
            string operacion =string.Format("PlanesAlimenticios/{0}/{1}/{2}",param1,param2,param3);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<PlanAlimenticioModel> ListaResultado = js.Deserialize<List<PlanAlimenticioModel>>(resultadoJSON);
            var resultado = ListaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ListarTodosPlanesAlimenticios
        [HttpGet]
        public JsonResult listarTodosPlanesAlimenticios(string param1, string param2)
        {
            string operacion = string.Format("PlanesAlimenticios/Todos/{0}/{1}", param1, param2);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<PlanAlimenticioModel> ListaResultado = js.Deserialize<List<PlanAlimenticioModel>>(resultadoJSON);
            var resultado = ListaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ListarCategorias
        [HttpGet]
        public JsonResult listarCategorias()
        {
            string operacion = "PlanAlimenticio/Categorias";
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaResultado = js.Deserialize<List<GenericoModel>>(resultadoJSON);
            var resultado = ListaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ListarSubCategorias
        [HttpGet]
        public JsonResult listarSubCategorias(string param1)
        {
            string operacion =string.Format("PlanAlimenticio/SubCategorias/{0}", param1);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaResultado = js.Deserialize<List<GenericoModel>>(resultadoJSON);
            var resultado = ListaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ListarAlimentosPorSubCategoria
        [HttpGet]
        public JsonResult listarAlimentosPorSubCategoria(string param1)
        {
            string operacion = string.Format("PlanAlimenticio/Alimentos/{0}", param1);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<AlimentoModel> ListaResultado = js.Deserialize<List<AlimentoModel>>(resultadoJSON);
            var resultado = ListaResultado;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region ListarValoresPorDefectoPlanAlimenticioNuevo
        [HttpGet]
        public JsonResult listaValoresPorDefectoPlanAlimenticioNuevo()
        {
            InformacionPlanAlimenticioNuevoModel valoresPlanAlimenticioNuevo = new InformacionPlanAlimenticioNuevoModel();
            valoresPlanAlimenticioNuevo.especies = listarEspecies();
            valoresPlanAlimenticioNuevo.condicionesMedicas = listarCondicionesMedicas();
            valoresPlanAlimenticioNuevo.razas = listarRazas("0");
            valoresPlanAlimenticioNuevo.nivelesBMI = listarNivelesBMI();
            valoresPlanAlimenticioNuevo.etapasVida = listarEtapasVida();
            var resultado = valoresPlanAlimenticioNuevo;
            //returning josn result  
            return Json(resultado, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Métodos Privados
        #region ListarEspecies
        private List<GenericoModel> listarEspecies()
        {
            string operacion = "PlanAlimenticio/Especies";
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaResultado = js.Deserialize<List<GenericoModel>>(resultadoJSON);
            return ListaResultado;
        }
        #endregion

        #region ListarCondicionesMedicas
        private List<GenericoModel> listarCondicionesMedicas()
        {
            string operacion = "PlanAlimenticio/CondicionesMedicas";
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaResultado = js.Deserialize<List<GenericoModel>>(resultadoJSON);
            return ListaResultado;
        }
        #endregion

        #region ListarRazas
        private List<GenericoModel> listarRazas(string especie)
        {
            string operacion =string.Format("PlanAlimenticio/Razas/{0}",especie);
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaResultado = js.Deserialize<List<GenericoModel>>(resultadoJSON);
            return ListaResultado;
        }
        #endregion

        #region ListarNivelesBMI
        private List<GenericoModel> listarNivelesBMI()
        {
            string operacion = "PlanAlimenticio/NivelesBMI";
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaResultado = js.Deserialize<List<GenericoModel>>(resultadoJSON);
            return ListaResultado;
        }
        #endregion

        #region ListarEtapasvida
        private List<GenericoModel> listarEtapasVida()
        {
            string operacion = "PlanAlimenticio/EtapasVida";
            string resultadoJSON = _Util.ObtenerResultadoJSONGET(string.Format("{0}{1}", endpointPetCenter, operacion));
            JavaScriptSerializer js = new JavaScriptSerializer();
            List<GenericoModel> ListaResultado = js.Deserialize<List<GenericoModel>>(resultadoJSON);
            return ListaResultado;
        }
        #endregion
        #endregion
    }
}