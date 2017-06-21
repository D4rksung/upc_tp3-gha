using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetCenter.BusinessEntities
{
    public class MonitoreoBE
    {
        public int codigo { get; set; }
        public MascotaBE mascota { get; set; }
        public string observacion { get; set; }

        public List<fotoMonitoreoBE> listaFotos { get; set; }
        public string fechaRegistro { get; set; }

    }
}
