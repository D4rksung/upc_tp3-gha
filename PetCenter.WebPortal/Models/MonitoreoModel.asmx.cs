using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Web.Script.Services;
using System.Web.Services;
using System.Net;
using System.IO;
using System.Web.Script.Serialization;
using PetCenter.BusinessEntities;
namespace PetCenter.WebPortal.Models
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.Web.Script.Services.ScriptService]
    public class MonitoreoModel : System.Web.Services.WebService
    {

        #region Set Contenido
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public MonitoreoBE RegistrarMonitoreo(int lugarHospedaje, int mascota, string observaciones)
        {
            string postdata = "{\"codigo\":0,\"lugarHospedaje\":"+lugarHospedaje+",\"mascota\":"+mascota+",\"observaciones\":\""+observaciones+"\"}";
            byte[] data = Encoding.UTF8.GetBytes(postdata);
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo");
            req.Method = "POST";
            req.ContentLength = data.Length;
            req.ContentType = "application/json";
            var reqStream = req.GetRequestStream();
            reqStream.Write(data, 0, data.Length);
            var res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string ordenClienteJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            MonitoreoBE monitoreo = js.Deserialize<MonitoreoBE>(ordenClienteJson);
            return monitoreo;
        }
        #endregion

        #region Set Contenido
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public fotoMonitoreoBE   RegistrarFotoMonitoreo(int monitoreo, string nombre)
        {
            string postdata = "{\"monitoreo\":"+monitoreo+",\"nombre\":\""+nombre+"\"}";
            byte[] data = Encoding.UTF8.GetBytes(postdata);
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://localhost/PetCenter.RESTServices/MonitoreoService.svc/Monitoreo/foto");
            req.Method = "POST";
            req.ContentLength = data.Length;
            req.ContentType = "application/json";
            var reqStream = req.GetRequestStream();
            reqStream.Write(data, 0, data.Length);
            var res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            string ordenClienteJson = reader.ReadToEnd();
            JavaScriptSerializer js = new JavaScriptSerializer();
            fotoMonitoreoBE fotoMonitoreo = js.Deserialize<fotoMonitoreoBE>(ordenClienteJson);
            return fotoMonitoreo;
        }
        #endregion
    }
}
