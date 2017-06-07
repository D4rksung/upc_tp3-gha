using System;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace PetCenter.Web.Clases
{
    public class Util
    {
        public static void SortGridGenerico<T>(ref List<T> lista, String pstrSortOrder, String pstrSortColumn)
        {
            if (!string.IsNullOrEmpty(pstrSortColumn) && lista != null && lista.Count > 0)
            {

                Type t = lista[0].GetType();

                if (pstrSortOrder.ToUpper() == "ASC")
                {

                    lista = lista.OrderBy(
                        a => t.InvokeMember(
                            pstrSortColumn
                            , System.Reflection.BindingFlags.GetProperty
                            , null
                            , a
                            , null
                        )
                    ).ToList();
                }
                else
                {
                    lista = lista.OrderByDescending(
                        a => t.InvokeMember(
                            pstrSortColumn
                            , System.Reflection.BindingFlags.GetProperty
                            , null
                            , a
                            , null
                        )
                    ).ToList();
                }
            }
        }
    }
}