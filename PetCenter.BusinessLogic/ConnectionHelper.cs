using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using PetCenter.DataAccess;
namespace PetCenter.BusinessLogic
{
    public static class ConnectionHelper
    {
        
        public static IConnectionFactory GetConnection()
        {
            return new DbConnectionFactory(ConfigurationManager.ConnectionStrings["cnSecurity"].ToString());
        }
    }
}
