using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using PetCenter.BusinessEntities;
namespace PetCenter.RESTServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IPlanAlimenticioService" in both code and config file together.
    [ServiceContract]
    public interface IPlanAlimenticioService
    {
        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "PlanAlimenticio/Especies")]
        List<GenericoBE> listarEspecies();

        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "PlanAlimenticio/CondicionesMedicas")]
        List<GenericoBE> listarCondicionesMedicas();

        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "PlanAlimenticio/Razas/{especie}")]
        List<GenericoBE> listarRazas(string especie);

        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "PlanAlimenticio/EtapasVida")]
        List<GenericoBE> listarEtapasVida();

        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "PlanAlimenticio/NivelesBMI")]
        List<GenericoBE> listarNivelesBMI();

        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "PlanAlimenticios/{filtro}/{especie}/{condicionMedica}")]
        List<PlanAlimenticioBE> listarPlanesAlimenticios(string filtro, string especie, string condicionMedica);

        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "PlanAlimenticio/Categorias")]
        List<GenericoBE> listarCategorias();

        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "PlanAlimenticio/SubCategorias/{categoria}")]
        List<GenericoBE> listarSubCategorias(string categoria);

        [OperationContract]
        [WebInvoke(Method = "GET",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "PlanAlimenticio/Alimentos/{subcategoria}")]
        List<AlimentoBE> listarAlimentosPorSubcategoria(string subcategoria);
            //[OperationContract]
            //[WebInvoke(Method = "GET",
            //    ResponseFormat = WebMessageFormat.Json,
            //    BodyStyle = WebMessageBodyStyle.Bare,
            //    UriTemplate = "PlanAlimenticio/{codigo}")]
            //PlanAlimenticioBE obtenerPlanAlimenticio(int codigo);

            //[OperationContract]
            //[WebInvoke(Method = "POST",
            //    ResponseFormat = WebMessageFormat.Json,
            //    BodyStyle = WebMessageBodyStyle.Bare,
            //    UriTemplate = "PlanAlimenticio/{planAlimenticio}")]
            //PlanAlimenticioBE registrarPlanAlimenticio(PlanAlimenticioBE planAlimenticio);


        }
}
