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
    public class _AlimentoRepository : Repository<AlimentoBE>
    {
        private DbContext _context;
        public _AlimentoRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }
        public List<AlimentoBE> listaAlimentosPorSubcategoria(int subcategoria)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarAlimentosPorSubcategoria";
                command.Parameters.Add(command.CreateParameter("@monitoreo", subcategoria));
                return this.ToList(command).ToList();
            }
        }

    }
}
