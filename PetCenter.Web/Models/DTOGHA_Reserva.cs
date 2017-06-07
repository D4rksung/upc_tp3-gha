using System;
using System.ComponentModel.DataAnnotations;

namespace PetCenter.Web.Models
{
    public class DTOGHA_Reserva : DTOBase
    {
        private Int64 _CodigoReserva;
        public Int64 CodigoReserva { get { return _CodigoReserva; } set { _CodigoReserva = value; } }

        private Int32 _CodigoCliente;
        public Int32 CodigoCliente { get { return _CodigoCliente; } set { _CodigoCliente = value; } }

        private Int32 _CodigoMascota;
        public Int32 CodigoMascota { get { return _CodigoMascota; } set { _CodigoMascota = value; } }

        private DateTime _FechaRegistro;
        public DateTime FechaRegistro { get { return _FechaRegistro; } set { _FechaRegistro = value; } }

        private Int16 _EstadoReserva;
        public Int16 EstadoReserva { get { return _EstadoReserva; } set { _EstadoReserva = value; } }

        private String _NombreMascota;
        [Display(Name = "Mascota")]
        public String NombreMascota { get { return _NombreMascota; } set { _NombreMascota = value; } }

        private String _NombreRaza;
        public String NombreRaza { get { return _NombreRaza; } set { _NombreRaza = value; } }

        private String _DescripcionEspecie;
        public String DescripcionEspecie { get { return _DescripcionEspecie; } set { _DescripcionEspecie = value; } }

        private DateTime _FechaInicio;
        [Display(Name = "Fecha de inicio")]
        public DateTime FechaInicio { get { return _FechaInicio; } set { _FechaInicio = value; } }

        private DateTime _FechaFin;
        [Display(Name = "Fecha de fin")]
        public DateTime FechaFin { get { return _FechaFin; } set { _FechaFin = value; } }

        private String _NombreCliente;
        [Display(Name = "Apellidos y Nombres")]
        public String NombreCliente { get { return _NombreCliente; } set { _NombreCliente = value; } }

        private String _DireccionCliente;
        [Display(Name = "Dirección")]
        public String DireccionCliente { get { return _DireccionCliente; } set { _DireccionCliente = value; } }

        private Int64 _CodigoLugar;
        public Int64 CodigoLugar { get { return _CodigoLugar; } set { _CodigoLugar = value; } }

        private String _DescripcionLugar;
        public String DescripcionLugar { get { return _DescripcionLugar; } set { _DescripcionLugar = value; } }

        [Display(Name = "Estado")]
        public String DescripcionEstado { 
            get { 
                String _DescripcionEstado = String.Empty;

                switch (_EstadoReserva)
                {
                    case 1:
                        _DescripcionEstado = "Registrado";
                        break;
                    case 2:
                        _DescripcionEstado = "Hospedado";
                        break;
                    case 3:
                        _DescripcionEstado = "Anulado";
                        break;
                };

                return _DescripcionEstado;
            } 
        }

        [Display(Name = "Fecha Hoy")]
        public DateTime FechaHoy
        {
            get
            {
                return DateTime.Now;
            }
        }
    }
}