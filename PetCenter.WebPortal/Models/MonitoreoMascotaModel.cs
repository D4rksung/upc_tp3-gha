using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetCenter.WebPortal.Models
{
    public class MonitoreoMascotaModel
    {
        public int codigo { get; set; }
        public long lugarHospedaje { get; set; }
        public int mascota { get; set; }
        public string observaciones { get; set; }
        public string fechaRegistro { get; set; }
    }
}