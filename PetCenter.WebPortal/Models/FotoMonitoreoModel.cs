using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetCenter.WebPortal.Models
{
    public class FotoMonitoreoModel
    {
        public int monitoreo { get; set; }
        public int foto { get; set; }
        public string nombre { get; set; }
        public string contenido { get; set; }
        public string fechaRegistro { get; set; }
    }
}