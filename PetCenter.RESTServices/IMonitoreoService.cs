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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMonitoreoService" in both code and config file together.
    [ServiceContract]
    public interface IMonitoreoService
    {
        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "Monitoreo/Mascotas/Todas/{recepcionista}")]
        List<GenericoBE> listarMascotasPorRecepcionista(string recepcionista);

        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "Monitoreo/Mascotas/{filtro}/{recepcionista}")]
        List<GenericoBE> listarMascotasPorRecepcionistaFiltro(string filtro,string recepcionista);


        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "Monitoreo/Mascota/{mascota}")]
        MascotaBE obtenerDatosMascota(string mascota);

        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "Monitoreos/{mascota}")]
        List<MonitoreoBE> listarMonitoreosPorMascota(string mascota);

        [OperationContract]
        [WebInvoke(Method = "GET",
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare,
            UriTemplate = "Monitoreo/fotos/{monitoreo}")]
        List<fotoMonitoreoBE> listarFotosMonitoreosPorMascota(string monitoreo);
    }
}
