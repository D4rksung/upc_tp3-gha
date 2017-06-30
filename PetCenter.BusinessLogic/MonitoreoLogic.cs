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

        
        public List<MascotaBE> listarMascotasPorRecepcionista(string filtro, int recepcionista)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var mascotaRep = new _MascotaRepository(context);

            return mascotaRep.listarMascotasPorRecepcionista(filtro,recepcionista);
        }

        public MascotaBE obtenerDatosMascota(int mascota)
        {
            connectionFactory = ConnectionHelper.GetConnection();
            var context = new DbContext(connectionFactory);

            var mascotaRep = new _MascotaRepository(context);

            return mascotaRep.ObtenerDatosMascota(mascota);
        }

        public List<MonitoreoBE> listarMonitoreosMascota(int lugarHospedaje, int mascota)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var monitoreoRep = new _MonitoreoRepository(context);

            return monitoreoRep.listaMonitoreosMascota(lugarHospedaje,mascota);
        }

        public List<fotoMonitoreoBE> listarFotosMonitoreoMascota(int monitoreo)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var fotoMonitoreoRep = new _FotoMonitoreoRepository(context);

            return fotoMonitoreoRep.listaFotosMonitoreosMascota(monitoreo);
        }

        public MonitoreoBE registrarMonitoreo(MonitoreoBE monitoreo) {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var monitoreoRep = new _MonitoreoRepository(context);

            return monitoreoRep.registrarMonitoreo(monitoreo);
        }

        public fotoMonitoreoBE registrarFotoMonitoreo(fotoMonitoreoBE fotoMonitoreo)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var fotoMonitoreoRep = new _FotoMonitoreoRepository(context);

            return fotoMonitoreoRep.registrarFotoMonitoreo(fotoMonitoreo);
        }
    }
}
