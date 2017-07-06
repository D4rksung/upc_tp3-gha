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
    public class _GenericRepository:Repository<GenericoBE>
    {
        private DbContext _context;
        public _GenericRepository(DbContext context)
            : base(context)
        {
            _context = context;
        }

        #region listarEspecies
        public List<GenericoBE> listarEspecies()
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarEspecies";
                return this.ToList(command).ToList();
            }
        }
        #endregion

        #region listarRazas
        public List<GenericoBE> listarRazas(int especie)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarRaza";
                command.Parameters.Add(command.CreateParameter("@especie", especie));
                return this.ToList(command).ToList();
            }
        }
        #endregion

        #region listarCondicionesMedicas
        public List<GenericoBE> listarCondicionesMedicas()
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarCondicionesMedicas";
                return this.ToList(command).ToList();
            }
        }
        #endregion

        #region listarNivelBMI
        public List<GenericoBE> listarNivelBMI()
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarBMI";
                return this.ToList(command).ToList();
            }
        }
        #endregion

        #region listarEtapasVida
        public List<GenericoBE> listarEtapasVida()
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarEtapaVida";
                return this.ToList(command).ToList();
            }
        }
        #endregion

        #region listarCategoria
        public List<GenericoBE> listarCategoria()
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarCategoriaAlimento";
                return this.ToList(command).ToList();
            }
        }
        #endregion

        #region listarSubCategoria
        public List<GenericoBE> listarSubCategoria(int categoria)
        {
            using (var command = _context.CreateCommand())
            {
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "usp_GHA_ListarSubCategoriaAlimento";
                command.Parameters.Add(command.CreateParameter("@categoria", categoria));
                return this.ToList(command).ToList();
            }
        }
        #endregion





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
