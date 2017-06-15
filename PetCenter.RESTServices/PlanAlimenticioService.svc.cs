using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using PetCenter.BusinessLogic;
using PetCenter.BusinessEntities;
namespace PetCenter.RESTServices
{
    public class PlanAlimenticioService : IPlanAlimenticioService
    {
        public List<AlimentoBE> listarAlimentos()
        {
            List<AlimentoBE> listaAlimentos = new List<AlimentoBE>();
            listaAlimentos = new PlanAlimenticioLogic().listarAlimentos();
            return listaAlimentos;
        }
    }
}
