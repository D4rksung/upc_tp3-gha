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
    public class _MascotaRepository : Repository<MascotaBE>
    {
        private DbContext _context;
        public _MascotaRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }

        public MascotaBE ObtenerDatosMascota(int mascota)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ConsultarDatosMascota";

                command.Parameters.Add(command.CreateParameter("@codigoMascota", mascota));

                return this.ToList(command).FirstOrDefault();
            }
        }
    }
}
