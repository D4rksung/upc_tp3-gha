using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace PetCenter.Web.Models
{
    public class Cesado
    {
        [Display(Name = "apellidopaterno")]
        public string apellidopaterno { get; set; }
        [Display(Name = "apellidomaterno")]
        public string apellidomaterno { get; set; }
        [Display(Name = "apellidos")]
        public string apellidos { get; set; }
    }
}