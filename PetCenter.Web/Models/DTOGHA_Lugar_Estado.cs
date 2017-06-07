using System;
using System.ComponentModel.DataAnnotations;

namespace PetCenter.Web.Models
{
    public class DTOGHA_Lugar_Estado : DTOBase
    {
        private Int64 _CodigoLugarEstado;
        public Int64 CodigoLugarEstado
        {
            get { return _CodigoLugarEstado; }
            set { _CodigoLugarEstado = value; }
        }

        private Int64 _CodigoLugar;
        public Int64 CodigoLugar
        {
            get { return _CodigoLugar; }
            set { _CodigoLugar = value; }
        }

        private String _Estado_lugar;
        public String Estado_lugar
        {
            get { return _Estado_lugar; }
            set { _Estado_lugar = value; }
        }

        private Int32 _Periodo;
        public Int32 Periodo
        {
            get { return _Periodo; }
            set { _Periodo = value; }
        }

        private DateTime _FechaDia;
        public DateTime FechaDia
        {
            get { return _FechaDia; }
            set { _FechaDia = value; }
        }

        private Boolean _ValidarPeriodo;
        public Boolean ValidarPeriodo
        {
            get { return _ValidarPeriodo; }
            set { _ValidarPeriodo = value; }
        }

        private String _DescripcionLugar;
        public String DescripcionLugar
        {
            get { return _DescripcionLugar; }
            set { _DescripcionLugar = value; }
        }

        private DateTime _FechaInicio;
        public DateTime FechaInicio
        {
            get { return _FechaInicio; }
            set { _FechaInicio = value; }
        }

        private DateTime _FechaFin;
        public DateTime FechaFin
        {
            get { return _FechaFin; }
            set { _FechaFin = value; }
        }
    }
}