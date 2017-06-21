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
    public class _MonitoreoRepository:Repository<MonitoreoBE>
    {
        private DbContext _context;
        public _MonitoreoRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }

        public IList<MonitoreoBE> listaMonitoreosMascota(int mascota)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarMonitoreoPorMascota";
                command.Parameters.Add(command.CreateParameter("@mascota", mascota));
                return this.ToList(command).ToList();
            }
        }
    }
}
