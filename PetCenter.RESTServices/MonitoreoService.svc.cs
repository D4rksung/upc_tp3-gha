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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "MonitoreoService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select MonitoreoService.svc or MonitoreoService.svc.cs at the Solution Explorer and start debugging.
    public class MonitoreoService : IMonitoreoService
    {
        public List<GenericoBE> listarMascotasPorRecepcionista(string recepcionista)
        {
            List<GenericoBE> listaAlimentos = new List<GenericoBE>();
            return new MonitoreoLogic().listarMascotasPorRecepcionista(int.Parse(recepcionista)).ToList();
        }
    }
}
