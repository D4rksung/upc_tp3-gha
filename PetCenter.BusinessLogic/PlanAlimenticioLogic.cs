using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PetCenter.BusinessEntities;
using PetCenter.DataAccess;
using PetCenter.DataAccess.Repositories;
namespace PetCenter.BusinessLogic
{
    

    public class PlanAlimenticioLogic
    {
        private IConnectionFactory connectionFactory;

        public List<GenericoBE> listarEspecies() {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var genericoRep = new _GenericRepository(context);

            return genericoRep.listarEspecies();
        }
        public List<GenericoBE> listarRazas(int especie)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var genericoRep = new _GenericRepository(context);

            return genericoRep.listarRazas(especie);
        }

        public List<GenericoBE> listarCondicionesMedicas()
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var genericoRep = new _GenericRepository(context);

            return genericoRep.listarCondicionesMedicas();
        }
        public List<GenericoBE> listarNivelBMI()
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var genericoRep = new _GenericRepository(context);

            return genericoRep.listarNivelBMI();
        }
        public List<GenericoBE> listarEtapasVida()
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var genericoRep = new _GenericRepository(context);

            return genericoRep.listarEtapasVida();
        }

        public List<GenericoBE> listarCategorias()
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var genericoRep = new _GenericRepository(context);

            return genericoRep.listarCategoria();
        }
        public List<GenericoBE> listarSubCategorias(int categoria)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var genericoRep = new _GenericRepository(context);

            return genericoRep.listarSubCategoria(categoria);
        }

        public PlanAlimenticioBE registrarPlanAlimenticio(PlanAlimenticioBE planAlimenticio)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var planAlimenticioRep = new _PlanAlimenticioRepository(context);

            return planAlimenticioRep.registrarPlanAlimenticio(planAlimenticio);
        }

        public CriterioPlanAlimenticioBE registrarCriterioPlanAlimenticio(CriterioPlanAlimenticioBE criterioPlanAlimenticio)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var criterioPlanAlimenticioRep = new _CriterioPlanAlimenticioRepository(context);

            return criterioPlanAlimenticioRep.registrarCriterioPlanAlimenticio(criterioPlanAlimenticio);
        }

        public planProgramacionDiaBE registrarCriterioPlanAlimenticio(planProgramacionDiaBE planProgramacionDia)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var planProgramacionDiaRep = new _PlanProgramacionDiaRepository(context);

            return planProgramacionDiaRep.registrarPlanProgramacionDia(planProgramacionDia);
        }

        public PlatoBE registrarCriterioPlanAlimenticio(PlatoBE plato)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var platoRep = new _PlatoRepository(context);

            return platoRep.registrarPlato(plato);
        }


        public List<PlanAlimenticioBE> listarPlanAlimenticio(string filtro,int especie, int condicionMedica)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var planAlimenticioRep = new _PlanAlimenticioRepository(context);

            return planAlimenticioRep.listaPlanesAlimenticios(filtro,especie,condicionMedica);
        }

        public List<CriterioPlanAlimenticioBE> listarCriteriosPorPlanAlimenticio(int planAlimenticio)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var criterioPlanAlimenticioRep = new _CriterioPlanAlimenticioRepository(context);

            return criterioPlanAlimenticioRep.listaCriteriosPlanAlimenticio(planAlimenticio);
        }

        public List<planProgramacionDiaBE> listarPlanProgramacionDiaPorPlanAlimenticio(int planAlimenticio)
        {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var planProgramacionDiaRep = new _PlanProgramacionDiaRepository(context);

            return planProgramacionDiaRep.listarPlanProgramacionDiaPorPlanAlimenticio(planAlimenticio);
        }
    }
}
