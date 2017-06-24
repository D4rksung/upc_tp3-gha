using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PetCenter.BusinessEntities
{
    public class CriterioPlanAlimenticioBE
    {
        public int codigo { get; set; }
        public int planAlimenticio { get; set; }
        public int raza { get; set; }
        public int nivelBMI { get; set; }
        public int etapaVida { get; set; }
    }
}
