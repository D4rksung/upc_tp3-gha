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
            UriTemplate = "PlanAlimenticio/Razas/{especie}")]
        List<GenericoBE> listarRazas(int especie);
    }
}
