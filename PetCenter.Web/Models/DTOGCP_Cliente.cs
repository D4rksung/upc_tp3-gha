using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace PetCenter.Web.Models
{
    public class DTOGCP_Cliente : DTOBase
    {
        private Int32 _CodigoCliente;
        public Int32 CodigoCliente { get { return _CodigoCliente; } set { _CodigoCliente = value; } }

        private String _NombreCliente;
        [Display(Name = "Apellidos y Nombres")]
        public String NombreCliente { get { return _NombreCliente; } set { _NombreCliente = value; } }

        private String _DireccionCliente;
        [Display(Name = "Dirección")]
        public String DireccionCliente { get { return _DireccionCliente; } set { _DireccionCliente = value; } }

        private List<DTOGHA_Reserva> _lstReserva;
        public List<DTOGHA_Reserva> lstReserva { get { return _lstReserva; } set { _lstReserva = value; } }
    }
}