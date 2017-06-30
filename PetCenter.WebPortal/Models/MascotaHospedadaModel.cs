using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetCenter.WebPortal.Models
{
    public class MascotaHospedadaModel
    {
        public int codigo { get; set; }
        public string mascota { get; set; }
        public string cliente { get; set; }
        public string fechaIngreso { get; set; }
    }
}