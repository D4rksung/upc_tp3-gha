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

        public IList<AlimentoBE> getAlimentos() {
            connectionFactory = ConnectionHelper.GetConnection();

            var context = new DbContext(connectionFactory);

            var userRep = new PlanAlimenticioRepository(context);

            return userRep.GetUsers();
        }

    }
}
