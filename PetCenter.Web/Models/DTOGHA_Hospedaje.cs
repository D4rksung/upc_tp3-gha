using System;
using System.ComponentModel.DataAnnotations;

namespace PetCenter.Web.Models
{
    public class DTOGHA_Hospedaje : DTOBase
    {
        private Int64 _CodigoHospedaje;
        public Int64 CodigoHospedaje
        {
            get { return _CodigoHospedaje; }
            set { _CodigoHospedaje = value; }
        }

        private String _NombreMascota;
        [Display(Name = "Mascota")]
        public String NombreMascota { get { return _NombreMascota; } set { _NombreMascota = value; } }

        private String _NombreRaza;
        public String NombreRaza { get { return _NombreRaza; } set { _NombreRaza = value; } }

        private String _DescripcionEspecie;
        public String DescripcionEspecie { get { return _DescripcionEspecie; } set { _DescripcionEspecie = value; } }

        private Int32 _CodigoCliente;
        public Int32 CodigoCliente { get { return _CodigoCliente; } set { _CodigoCliente = value; } }

        private String _NombreCliente;
        [Display(Name = "Apellidos y Nombres")]
        public String NombreCliente { get { return _NombreCliente; } set { _NombreCliente = value; } }

        private DateTime _FechaInicio;
        [Display(Name = "Fecha de inicio")]
        public DateTime FechaInicio { get { return _FechaInicio; } set { _FechaInicio = value; } }

        private DateTime _FechaFin;
        [Display(Name = "Fecha de fin")]
        public DateTime FechaFin { get { return _FechaFin; } set { _FechaFin = value; } }

        private Int16 _EstadoHospedaje;
        public Int16 EstadoHospedaje { get { return _EstadoHospedaje; } set { _EstadoHospedaje = value; } }

        private Int64 _CodigoLugar;
        public Int64 CodigoLugar { get { return _CodigoLugar; } set { _CodigoLugar = value; } }

        private String _DescripcionLugar;
        public String DescripcionLugar { get { return _DescripcionLugar; } set { _DescripcionLugar = value; } }

        [Display(Name = "Estado")]
        public String DescripcionEstado
        {
            get
            {
                String _DescripcionEstado = String.Empty;

                switch (_EstadoHospedaje)
                {
                    case 1:
                        _DescripcionEstado = "Registrado";
                        break;
                    case 2:
                        _DescripcionEstado = "Anulado";
                        break;
                };

                return _DescripcionEstado;
            }
        }

        //private Boolean _BuscarPorReserva;
        //public Boolean BuscarPorReserva
        //{
        //    get
        //    {
        //        return _BuscarPorReserva;
        //    }
        //    set
        //    {
        //        _BuscarPorReserva = value;
        //    }
        //}
    }
}