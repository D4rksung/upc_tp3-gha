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
    public class _PlanAlimenticioRepository:Repository<PlanAlimenticioBE>
    {
        private DbContext _context;
        public _PlanAlimenticioRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }

        public List<PlanAlimenticioBE> listaPlanesAlimenticios(string filtro, int especie, int condicioMedica)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarPlanesAlimenticio";
                command.Parameters.Add(command.CreateParameter("@filtro", filtro));
                command.Parameters.Add(command.CreateParameter("@especie", especie));
                command.Parameters.Add(command.CreateParameter("@condicionMedica", condicioMedica));
                return this.ToList(command).ToList();
            }
        }

        public PlanAlimenticioBE registrarPlanAlimenticio(PlanAlimenticioBE planAlimenticio)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_RegistrarPlanAlimenticio";
                command.Parameters.Add(command.CreateParameter("@nombre", planAlimenticio.nombre));
                command.Parameters.Add(command.CreateParameter("@descripcion", planAlimenticio.descripcion));
                command.Parameters.Add(command.CreateParameter("@especie", planAlimenticio.especie));
                command.Parameters.Add(command.CreateParameter("@condicionMedica", planAlimenticio.condicionMedica));
                return this.ToList(command).FirstOrDefault();
            }

        }
    }
}
