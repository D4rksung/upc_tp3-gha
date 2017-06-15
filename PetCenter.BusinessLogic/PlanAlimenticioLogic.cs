using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PetCenter.BusinessEntities;
using PetCenter.DataAccess;
namespace PetCenter.BusinessLogic
{
    public class PlanAlimenticioLogic
    {
        public List<AlimentoBE> listarAlimentos() {

            return new PlanAlimenticioData().listarAlimentosData();
        }
    }
}
