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
    public class _PlanProgramacionDiaRepository:Repository<planProgramacionDiaBE>
    {
        private DbContext _context;
        public _PlanProgramacionDiaRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }
        public List<planProgramacionDiaBE> listarPlanProgramacionDiaPorPlanAlimenticio(int planAlimenticio)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarPlanProgramacionDiaPorPlanAlimenticio";
                command.Parameters.Add(command.CreateParameter("@planAlimenticio", planAlimenticio));
                return this.ToList(command).ToList();
            }
        }

        public planProgramacionDiaBE registrarPlanProgramacionDia(planProgramacionDiaBE planProgramacionDia)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_RegistrarPlanProgramacionDia";

                command.Parameters.Add(command.CreateParameter("@planAlimenticio", planProgramacionDia.planALimenticio));
                command.Parameters.Add(command.CreateParameter("@numeroDia", planProgramacionDia.numeroDia));

                return this.ToList(command).FirstOrDefault();
            }

        }
    }
}
