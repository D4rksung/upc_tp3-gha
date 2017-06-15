using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using PetCenter.BusinessEntities;
namespace PetCenter.DataAccess
{
    public class _ListasGenericasData
    {
        private string cadenaConexion = string.Empty;
        private enum enumListado { codigo, descripcion };

        #region Constructor
        public _ListasGenericasData()
        {
            cadenaConexion = ConfigurationManager.ConnectionStrings["BDPetCenter"].ToString();
        }
        #endregion

        #region listarEstadosCitas
        public List<AlimentoBE> listarAlimentosData()
        {
            List<AlimentoBE> resultadoList = new List<AlimentoBE>();
            //string storeProcedure = "SP_InnovaSchools_GAA_Admision_ListarEstadosCita";
            //SqlConnection connection = new SqlConnection(cadenaConexion);
            //SqlCommand command = new SqlCommand(storeProcedure, connection);
            //command.CommandType = CommandType.StoredProcedure;
            //command.CommandTimeout = 3600000;
            //try
            //{
            //    connection.Open();
            //    SqlDataReader reader = command.ExecuteReader();
            //    #region reader.Read()
            //    while (reader.Read())
            //    {
            //        EstadoCitaBE resultado = new EstadoCitaBE();
            //        resultado.codigo = reader.GetInt32((int)enumListado.codigo);
            //        resultado.descripcion = reader.GetString((int)enumListado.descripcion);
            //        resultadoList.Add(resultado);
            //    }
            //    #endregion
            //    reader.Close();
            //}
            //catch (Exception ex)
            //{

            //}
            //finally
            //{
            //    if (connection.State == ConnectionState.Open)
            //        connection.Close();
            //    connection.Dispose();
            //    command.Dispose();
            //}
            return resultadoList;
        }
        #endregion

    }
}
