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
    public class PlanAlimenticioRepository : Repository<AlimentoBE>
    {
        private DbContext _context;
        public PlanAlimenticioRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }


        public IList<AlimentoBE> GetUsers()
        {
            //using (var command = _context.CreateCommand())
            //{
            //    command.CommandText = "exec [dbo].[uspGetUsers]";

            //    return this.ToList(command).ToList();
            //}

            List<AlimentoBE> resultadoList=new List<AlimentoBE>();
            AlimentoBE entidad = new AlimentoBE();
            entidad.codigo = 1;
            entidad.codigoMarca = 100;
            entidad.codigoSubcategoria = 1;
            entidad.codigoUnidadMedida = 20;
            entidad.nombre = "Alimento 1";

            AlimentoBE entidad2 = new AlimentoBE();
            entidad2.codigo = 1;
            entidad2.codigoMarca = 100;
            entidad2.codigoSubcategoria = 1;
            entidad2.codigoUnidadMedida = 20;
            entidad2.nombre = "Alimento 2";

            resultadoList.Add(entidad);
            return resultadoList;
        }

        //public User CreateUser(User user)
        //{
        //    using (var command = _context.CreateCommand())
        //    {
        //        command.CommandType = CommandType.StoredProcedure;
        //        command.CommandText = "uspSignUp";

        //        command.Parameters.Add(command.CreateParameter("@pFirstName", user.FirstName));
        //        command.Parameters.Add(command.CreateParameter("@pLastName", user.LastName));
        //        command.Parameters.Add(command.CreateParameter("@pUserName", user.UserName));
        //        command.Parameters.Add(command.CreateParameter("@pPassword", user.Password));
        //        command.Parameters.Add(command.CreateParameter("@pEmail", user.Email));

        //        return this.ToList(command).FirstOrDefault();


        //    }

        //}


        //public User LoginUser(string id, string password)
        //{
        //    using (var command = _context.CreateCommand())
        //    {
        //        command.CommandType = CommandType.StoredProcedure;
        //        command.CommandText = "uspSignIn";

        //        command.Parameters.Add(command.CreateParameter("@pId", id));
        //        command.Parameters.Add(command.CreateParameter("@pPassword", password));

        //        return this.ToList(command).FirstOrDefault();
        //    }
        //}


        //public User GetUserByUsernameOrEmail(string username, string email)
        //{
        //    using (var command = _context.CreateCommand())
        //    {
        //        command.CommandType = CommandType.StoredProcedure;
        //        command.CommandText = "uspGetUserByUsernameOrEmail";

        //        command.Parameters.Add(command.CreateParameter("@pUsername", username));
        //        command.Parameters.Add(command.CreateParameter("@pEmail", email));

        //        return this.ToList(command).FirstOrDefault();
        //    }
        //}


    }
}
