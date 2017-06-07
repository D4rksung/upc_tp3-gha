using System;

namespace PetCenter.Web.Models
{
    public class DTOGCP_Mascota : DTOBase
    {
        private Int32 _CodigoMascota;
        public Int32 CodigoMascota { get { return _CodigoMascota; } set { _CodigoMascota = value; } }

        private Int32 _CodigoCliente;
        public Int32 CodigoCliente { get { return _CodigoCliente; } set { _CodigoCliente = value; } }

        private String _NombreMascota;
        public String NombreMascota { get { return _NombreMascota; } set { _NombreMascota = value; } }

        private String _NombreRaza;
        public String NombreRaza { get { return _NombreRaza; } set { _NombreRaza = value; } }

        private String _DescripcionEspecie;
        public String DescripcionEspecie { get { return _DescripcionEspecie; } set { _DescripcionEspecie = value; } }
    }
}