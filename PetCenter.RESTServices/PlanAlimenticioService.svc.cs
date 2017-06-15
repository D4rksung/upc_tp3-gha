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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "PlanAlimenticioService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select PlanAlimenticioService.svc or PlanAlimenticioService.svc.cs at the Solution Explorer and start debugging.
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
