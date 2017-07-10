using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetCenter.WebPortal.Models
{
    public class PlanAlimenticioModel
    {
        public int codigo { get; set; }
        public string nombre { get; set; }
        public string especie { get; set; }
        public string condicionMedica { get; set; }
        public string fechaRegistro { get; set; }
    }
}