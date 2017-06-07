using System;

namespace PetCenter.Web.Models
{
    public class DTOGHA_Lugar_Reserva : DTOBase
    {
        private Int64 _CodigoLugarReserva;       
        public Int64 CodigoLugarReserva { get { return _CodigoLugarReserva; } set { _CodigoLugarReserva = value; } }

        private Int64 _CodigoReserva;
        public Int64 CodigoReserva { get { return _CodigoReserva; } set { _CodigoReserva = value; } }

        private Int64 _CodigoLugar;
        public Int64 CodigoLugar { get { return _CodigoLugar; } set { _CodigoLugar = value; } }

        private DateTime _FechaInicio;
        public DateTime FechaInicio { get { return _FechaInicio; } set { _FechaInicio = value; } }

        private DateTime _FechaFin;
        public DateTime FechaFin { get { return _FechaFin; } set { _FechaFin = value; } }
    }
}