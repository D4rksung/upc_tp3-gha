using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PetCenter.DataAccess.Extensions;
using PetCenter.BusinessEntities;

namespace PetCenter.DataAccess.Repositories
{
    public class _FotoMonitoreoRepository : Repository<fotoMonitoreoBE>
    {
        private DbContext _context;
        public _FotoMonitoreoRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }
        public List<fotoMonitoreoBE> listaFotosMonitoreosMascota(int monitoreo)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarFotosMonitoreo";
                command.Parameters.Add(command.CreateParameter("@monitoreo", monitoreo));
                return this.ToList(command).ToList();
            }
        }

        public fotoMonitoreoBE registrarFotoMonitoreo(fotoMonitoreoBE fotoMonitoreo)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_RegistrarFotoMonitoreo";

                command.Parameters.Add(command.CreateParameter("@monitoreo", fotoMonitoreo.monitoreo));
                command.Parameters.Add(command.CreateParameter("@nombre", fotoMonitoreo.nombre));
                command.Parameters.Add(command.CreateParameter("@contenido", fotoMonitoreo.contenido));

                return this.ToList(command).FirstOrDefault();
            }

        }
    }
}
