using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PetCenter.Web.Models;
using PetCenter.Web.Clases;

namespace PetCenter.Web.Controllers
{
    public class LugarController : Controller
    {
        public ActionResult Planifica()
        {
            DTOGHA_Lugar_Estado oItem = new DTOGHA_Lugar_Estado()
            {
                Periodo = DateTime.Now.Year
            };

            return View(oItem);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Planificar(DTOGHA_Lugar_Estado poItem)
        {
            String strResult = String.Empty;

            try
            {
                if (ModelState.IsValid)
                {
                    using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                    {
                        oContext.usp_PlanificarHospedaje(poItem.Periodo);
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(String.Empty, ex.Message);
            }

            return View("Planifica", poItem);
        }

        [HttpPost]
        public JsonResult Listar(DTOGHA_Lugar_Estado poItem)
        {
            List<DTOGHA_Lugar_Estado> lst = new List<DTOGHA_Lugar_Estado>();
            JsonResponse oItemResponse = new JsonResponse();

            try
            {
                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    lst = (from tbl in oContext.GHA_Lugar_Estado
                           where tbl.Periodo == poItem.Periodo
                           select new DTOGHA_Lugar_Estado
                           {
                               CodigoLugarEstado = tbl.CodigoLugarEstado,
                               CodigoLugar = tbl.CodigoLugar,
                               DescripcionLugar = tbl.GHA_Lugar.DescripcionLugar,
                               Estado_lugar = tbl.Estado_lugar,
                               Periodo = tbl.Periodo,
                               FechaDia = tbl.FechaDia
                           }).ToList();
                }

                Util.SortGridGenerico(ref lst, poItem.SortOrder, poItem.SortColumn);

                Int32 intPageCount = (lst.Count / poItem.PageSize) + (lst.Count % poItem.PageSize == 0 ? 0 : 1);
                Int32 intRecordCount = lst.Count();

                lst = lst.Skip((poItem.CurrentPage - 1) * poItem.PageSize).Take(poItem.PageSize).ToList();

                oItemResponse = oItemResponse.Serialization(intPageCount, poItem.CurrentPage, intRecordCount, lst);              
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Json(oItemResponse);
        }

        [HttpPost]
        public JsonResult ListarDisponibilidad(DTOGHA_Lugar_Estado poItem)
        {
            List<DTOGHA_Lugar_Estado> lst = new List<DTOGHA_Lugar_Estado>();
            JsonResponse oItemResponse = new JsonResponse();

            try
            {
                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    lst = (from tbl in oContext.GHA_Lugar_Estado
                           where tbl.FechaDia >= poItem.FechaInicio
                           && tbl.FechaDia <= poItem.FechaFin
                           group tbl by tbl.CodigoLugar into grp
                           select new DTOGHA_Lugar_Estado
                           {
                               CodigoLugar = grp.Key,
                               DescripcionLugar = grp.Max(x=>x.GHA_Lugar.DescripcionLugar),
                               Estado_lugar = grp.Max(x => x.Estado_lugar == "OCUPADO" || x.Estado_lugar == "RESERVADO" ? "1" : "0"),
                           }).ToList();

                    if (Session["ReservaDatos"] != null)
                    {
                        DTOGCP_Cliente oCliente = (DTOGCP_Cliente)Session["ReservaDatos"];
                        List<DTOGHA_Lugar_Estado> lstTemp = (from tbl in oCliente.lstReserva
                                                             where tbl.CodigoLugar > 0
                                                             && tbl.FechaInicio >= poItem.FechaInicio
                                                                && tbl.FechaFin <= poItem.FechaFin
                                                             group tbl by tbl.CodigoLugar into grp
                                                             select new DTOGHA_Lugar_Estado
                                                             {
                                                                 CodigoLugar = grp.Key,
                                                                 DescripcionLugar = grp.Max(x=> x.DescripcionLugar),
                                                                 Estado_lugar = "1"
                                                             }).ToList();

                        lstTemp = (from tbl in lstTemp
                                   where !(from tbl2 in lst
                                                where tbl2.Estado_lugar == "1"
                                                select tbl2.CodigoLugar).Contains(tbl.CodigoLugar)
                                   select tbl).ToList();

                        foreach (DTOGHA_Lugar_Estado oItemTemp in lstTemp)
                        {
                            DTOGHA_Lugar_Estado oItem = (from tbl in lst
                                                         where tbl.CodigoLugar == oItemTemp.CodigoLugar
                                                         select tbl).FirstOrDefault();

                            if (oItem != null) lst.Remove(oItem);
                        }

                        lst.AddRange(lstTemp);
                    }

                    lst = lst.OrderBy(x => x.CodigoLugar).ToList();
                }

                oItemResponse = oItemResponse.Serialization(lst);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Json(oItemResponse);
        }
    }
}
