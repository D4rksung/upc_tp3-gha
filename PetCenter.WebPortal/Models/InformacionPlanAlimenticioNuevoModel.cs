using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PetCenter.WebPortal.Models
{
    public class InformacionPlanAlimenticioNuevoModel
    {
        public List<GenericoModel> especies { get; set; }
        public List<GenericoModel> condicionesMedicas { get; set; }
        public List<GenericoModel> razas { get; set; }
        public List<GenericoModel> nivelesBMI { get; set; }
        public List<GenericoModel> etapasVida { get; set; }
    }
}