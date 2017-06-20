using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PetCenter.BusinessEntities;
namespace PetCenter.DataAccess
{
    public class PlanAlimenticioData
    {
        #region listarEstadosCitas
        public List<AlimentoBE> listarAlimentosData()
        {
            List<AlimentoBE> resultadoList = new List<AlimentoBE>();
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

            resultadoList.Add(entidad2);
            return resultadoList;
        }
        #endregion
    }
}
