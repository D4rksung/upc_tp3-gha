using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Web.Script.Serialization;

namespace PetCenter.Web.Models
{
    public class CesadoServiceCliente
    {
        private string BASE_URL = "https://aplicaciones01.ana.gob.pe/wsListadoIntranet/wsListadoIntranet.svc/";
        public List<Cesado> ListaCesados() {
            try
            {
                var webclient = new WebClient();
                var json = webclient.DownloadString(BASE_URL+ "Personal/Cesados");
                var js = new JavaScriptSerializer();
                return js.Deserialize<List<Cesado>>(json);
            }
            catch
            {
                return null;
            }
        }
    }
}