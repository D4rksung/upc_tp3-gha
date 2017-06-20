using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PetCenter.DataAccess;
namespace PetCenter.BusinessLogic
{
    public static class ConnectionHelper
    {
        
        public static IConnectionFactory GetConnection()
        {
            string cadena = "BDPetCenterEntities";
            return new DbConnectionFactory(cadena);
        }
    }
}
