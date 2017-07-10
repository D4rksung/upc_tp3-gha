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
        public List<GenericoBE> listarCondicionesMedicas()
        {
            return new PlanAlimenticioLogic().listarCondicionesMedicas();
        }
        public List<GenericoBE> listarRazas(string especie)
        {
            return new PlanAlimenticioLogic().listarRazas(int.Parse(especie));
        }

        public List<GenericoBE> listarEtapasVida() {
            return new PlanAlimenticioLogic().listarEtapasVida();
        }
        public List<GenericoBE> listarNivelesBMI() {
            return new PlanAlimenticioLogic().listarNivelBMI();
        }

        public List<GenericoBE> listarCategorias() {
            return new PlanAlimenticioLogic().listarCategorias();
        }

        public List<GenericoBE> listarSubCategorias(string categoria) {
            return new PlanAlimenticioLogic().listarSubCategorias(int.Parse(categoria));
        }

        public List<AlimentoBE> listarAlimentosPorSubcategoria(string subcategoria) {
            return new PlanAlimenticioLogic().listarAlimentosPorSubCategoria(int.Parse(subcategoria));
        }
        public List<PlanAlimenticioBE> listarPlanesAlimenticios(string filtro, string especie, string condicionMedica) {
            return new PlanAlimenticioLogic().listarPlanAlimenticio(filtro,int.Parse(especie),int.Parse(condicionMedica));
        }
        public List<PlanAlimenticioBE> listarTodosPlanesAlimenticios(string especie, string condicionMedica)
        {
            return new PlanAlimenticioLogic().listarPlanAlimenticio(string.Empty, int.Parse(especie), int.Parse(condicionMedica));
        }
    }
}
