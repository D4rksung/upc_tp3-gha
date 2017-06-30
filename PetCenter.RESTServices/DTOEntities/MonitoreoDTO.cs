using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PetCenter.BusinessEntities;
using System.Runtime.Serialization;
namespace PetCenter.RESTServices.DTOEntities
{
    [DataContract(Name = "mascotaHospedada")]
    public class mascotaHospedadaDTO
    {
        [DataMember]
        public int codigo { get; set; }
        [DataMember]
        public string mascota { get; set; }
        [DataMember]
        public string cliente { get; set; }
        [DataMember]
        public string fechaIngreso { get; set; }
    }

    [DataContract(Name = "mascotaHospedada")]
    public class mascota:MascotaBE
    {
    }
}