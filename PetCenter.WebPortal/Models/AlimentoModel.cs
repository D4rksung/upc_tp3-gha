using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetCenter.WebPortal.Models
{
    public class AlimentoModel
    {
        public int codigo { get; set; }
        public string nombre { get; set; }
        public string marca { get; set; }
        public string unidadMedida { get; set; }
        public int cantidad { get; set; }
    }
}