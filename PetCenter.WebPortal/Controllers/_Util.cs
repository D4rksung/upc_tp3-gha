using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Net;
using System.Text;
namespace PetCenter.WebPortal.Controllers
{
    public class _Util
    {
        #region ObtenerResultadoJSONGET
        public static string ObtenerResultadoJSONGET(string endpoint)
        {
            HttpWebRequest req = (HttpWebRequest)WebRequest
                .Create(endpoint);
            req.Method = "GET";
            HttpWebResponse res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            return reader.ReadToEnd();
        }
        #endregion

        #region ObtenerResultadoJSONPOST
        public static string ObtenerResultadoJSONPOST(string postdata, string endpoint)
        {
            byte[] data = Encoding.UTF8.GetBytes(postdata);
            HttpWebRequest req = (HttpWebRequest)WebRequest
                .Create(endpoint);
            req.Method = "POST";
            req.ContentLength = data.Length;
            req.ContentType = "application/json";
            var reqStream = req.GetRequestStream();
            reqStream.Write(data, 0, data.Length);
            var res = (HttpWebResponse)req.GetResponse();
            StreamReader reader = new StreamReader(res.GetResponseStream());
            return reader.ReadToEnd();
        }
        #endregion
    }
}