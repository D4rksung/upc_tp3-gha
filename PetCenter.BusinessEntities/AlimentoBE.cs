﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PetCenter.BusinessEntities
{
    public class AlimentoBE
    {
        public int codigo { get; set; }
        public string nombre { get; set; }
        public string marca { get; set; }
        public string unidadMedida { get; set; }
        public int codigoSubcategoria { get; set; }
        public int cantidad { get; set; }
    }
}
