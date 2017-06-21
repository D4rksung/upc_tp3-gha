using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PetCenter.BusinessEntities;
using PetCenter.DataAccess;
using PetCenter.DataAccess.Repositories;
namespace PetCenter.BusinessLogic
{
    public class MonitoreoLogic
    {
        private IConnectionFactory connectionFactory;

        public IList<GenericoBE> listarMascotasPorRecepcionista(string filtro, int recepcionista)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var genericRep = new _GenericRepository(context);

            return genericRep.listarMascotasPorRecepcionista(filtro,recepcionista);
        }

        public MonitoreoBE obtenerMonitoreoMascota(int mascota) {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);

            var monitoreoRep = new _MonitoreoRepository(context);

            return monitoreoRep.ObtenerMonitoreo(mascota);
        }
    }
}
