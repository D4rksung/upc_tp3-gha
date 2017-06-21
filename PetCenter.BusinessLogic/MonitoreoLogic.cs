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

        public MascotaBE obtenerDatosMascota(int mascota)
        {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);

            var mascotaRep = new _MascotaRepository(context);

            return mascotaRep.ObtenerDatosMascota(mascota);
        }

        public IList<MonitoreoBE> listarMonitoreosMascota(int mascota)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var monitoreoRep = new _MonitoreoRepository(context);

            return monitoreoRep.listaMonitoreosMascota(mascota);
        }

        public IList<fotoMonitoreoBE> listarFotosMonitoreoMascota(int monitoreo)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var fotoMonitoreoRep = new _FotoMonitoreoRepository(context);

            return fotoMonitoreoRep.listaFotosMonitoreosMascota(monitoreo);
        }
    }
}
