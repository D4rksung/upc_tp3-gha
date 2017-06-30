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
        public List<GenericoBE> listarEspecies()
        {
            return new PlanAlimenticioLogic().listarEspecies();
        }

        public List<GenericoBE> listarRazas(int especie)
        {
            return new PlanAlimenticioLogic().listarRazas(especie);
        }

        public List<PlanAlimenticioBE> listarPlanesAlimenticios(string filtro, int especie, int condicionMedica) {
            return new PlanAlimenticioLogic().listarPlanAlimenticio(filtro,especie,condicionMedica);
        }
    }
}
