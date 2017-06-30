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
    public class _PlatoRepository:Repository<PlatoBE>
    {
        private DbContext _context;
        public _PlatoRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }
        public List<PlatoBE> listaPlatos(int programacionDia,int comida)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarPlatos";
                command.Parameters.Add(command.CreateParameter("@programacionDia", programacionDia));
                command.Parameters.Add(command.CreateParameter("@comida", comida));
                return this.ToList(command).ToList();
            }
        }

        public PlatoBE registrarPlato(PlatoBE plato)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_RegistrarPlato";
                command.Parameters.Add(command.CreateParameter("@programacionDia", plato.programacionDia));
                command.Parameters.Add(command.CreateParameter("@comida", plato.comida));
                command.Parameters.Add(command.CreateParameter("@alimento", plato.alimento));
                return this.ToList(command).FirstOrDefault();
            }

        }
    }
}
