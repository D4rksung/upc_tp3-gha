using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PetCenter.BusinessEntities
{
    public class AlimentoBE
    {
        public int codigo { get; set; }
        public string nombre { get; set; }
        public int codigoMarca { get; set; }
        public int codigoUnidadMedida { get; set; }
        public int codigoSubcategoria { get; set; }
    }
}
