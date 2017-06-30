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
    public class _CriterioPlanAlimenticioRepository:Repository<CriterioPlanAlimenticioBE>
    {
        private DbContext _context;
        public _CriterioPlanAlimenticioRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }
        public List<CriterioPlanAlimenticioBE> listaCriteriosPlanAlimenticio(int planAlimenticio)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarCriteriosPorPlanAlimenticio";
                command.Parameters.Add(command.CreateParameter("@planAlimenticio", planAlimenticio));
                return this.ToList(command).ToList();
            }
        }

        public CriterioPlanAlimenticioBE registrarCriterioPlanAlimenticio(CriterioPlanAlimenticioBE criterioPlanAlimenticio)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_RegistrarCriterioPlanAlimenticio";
                command.Parameters.Add(command.CreateParameter("@planAlimenticio", criterioPlanAlimenticio.planAlimenticio));
                command.Parameters.Add(command.CreateParameter("@raza", criterioPlanAlimenticio.raza));
                command.Parameters.Add(command.CreateParameter("@nivelBMI", criterioPlanAlimenticio.nivelBMI));
                command.Parameters.Add(command.CreateParameter("@etapaVida", criterioPlanAlimenticio.etapaVida));

                return this.ToList(command).FirstOrDefault();
            }

        }
    }
}
