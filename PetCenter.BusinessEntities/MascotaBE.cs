using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetCenter.BusinessEntities
{
    public class MascotaBE
    {
        public int codigo { get; set; }
        public string nombre { get; set; }
        public string foto { get; set; }
        public string raza { get; set; }
        public string especie { get; set; }
        public string tamanio { get; set; }
        public int clienteCodigo { get; set; }
        public string cliente { get; set; }
        public int hospedaje { get; set; }
        public string tipoHabitacion { get; set; }
        public string habitacion { get; set; }
        public string fechaEntrada { get; set; }
        public string fechaSalida { get; set; }
    }
}
