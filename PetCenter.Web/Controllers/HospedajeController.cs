using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PetCenter.Web.Models;
using PetCenter.Web.Clases;
using System.Transactions;

namespace PetCenter.Web.Controllers
{
    public class HospedajeController : Controller
    {
        public ViewResult ConReserva(DTOGHA_Reserva poItem = null)
        {
            if (poItem == null) poItem = new DTOGHA_Reserva();

            return View(poItem);
        }

        public ViewResult BusquedaReserva()
        {
            return View();
        }

        public ActionResult Grabar(DTOGHA_Reserva poItem)
        {
            try
            {
                using (TransactionScope oAmbito = new TransactionScope())
                {
                    using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                    {
                        oContext.usp_GrabarHospedaje(poItem.CodigoReserva, poItem.CodigoCliente, poItem.CodigoMascota, poItem.CodigoLugar, poItem.FechaInicio, poItem.FechaFin);
                    }

                    oAmbito.Complete();
                }

                TempData["Mensaje"] = "Se realizó registro de hospedaje con éxito";
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(String.Empty, ex.Message);
            }

            return RedirectToAction("ConReserva");
        }

        [HttpPost]
        public JsonResult Listar(DTOGHA_Hospedaje poItem)
        {
            List<DTOGHA_Hospedaje> lst = new List<DTOGHA_Hospedaje>();
            JsonResponse oItemResponse = new JsonResponse();

            try
            {
                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    lst = (from tbl in oContext.GHA_Hospedaje
                            where 
                            //(tbl.CodigoReserva != null && poItem.BuscarPorReserva)
                            //|| (tbl.CodigoReserva == null && !poItem.BuscarPorReserva) &&
                            tbl.CodigoCliente == (poItem.CodigoCliente == 0 ? tbl.CodigoCliente : poItem.CodigoCliente)
                            select new DTOGHA_Hospedaje
                            {
                                CodigoHospedaje = tbl.CodigoHospedaje,
                                NombreMascota = tbl.GCP_Mascota.NombreMascota,
                                NombreRaza = tbl.GCP_Mascota.GCP_Raza.NombreRaza,
                                DescripcionEspecie = tbl.GCP_Mascota.GCP_Raza.GCP_Especie.DescripcionEspecie,
                                NombreCliente = tbl.GCP_Cliente.NombreCliente,
                                FechaInicio = tbl.GHA_Lugar_Hospedaje.FirstOrDefault().FechaInicio,
                                FechaFin = tbl.GHA_Lugar_Hospedaje.FirstOrDefault().FechaFin,
                                CodigoLugar = tbl.GHA_Lugar_Hospedaje.FirstOrDefault().CodigoLugar,
                                DescripcionLugar = tbl.GHA_Lugar_Hospedaje.FirstOrDefault().GHA_Lugar.DescripcionLugar,
                                EstadoHospedaje = tbl.EstadoHospedaje
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

        public JsonResult Anular(DTOGHA_Hospedaje poItem)
        {
            Boolean boolResult = false;

            try
            {
                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    GHA_Hospedaje oItem = (from tbl in oContext.GHA_Hospedaje
                                         where tbl.CodigoHospedaje == poItem.CodigoHospedaje
                                         select tbl).FirstOrDefault();

                    if (oItem != null)
                    {
                        oItem.EstadoHospedaje = 2;

                        GHA_Lugar_Hospedaje oLugarReserva = oItem.GHA_Lugar_Hospedaje.FirstOrDefault();

                        if (oLugarReserva != null)
                        {
                            List<GHA_Lugar_Estado> lst = (from tbl in oContext.GHA_Lugar_Estado
                                                          where tbl.CodigoLugar == oLugarReserva.CodigoLugar
                                                             && tbl.FechaDia >= oLugarReserva.FechaInicio
                                                             && tbl.FechaDia <= oLugarReserva.FechaFin
                                                          select tbl).ToList();

                            foreach (GHA_Lugar_Estado oLugar in lst)
                            {
                                if (oItem.CodigoReserva != null) oLugar.Estado_lugar = "RESERVADO";
                                else oLugar.Estado_lugar = "DISPONIBLE";
                            }

                            //if(oItem.CodigoReserva != null)
                            //{
                            //    GHA_Reserva oReserva = (from tbl in oContext.GHA_Reserva
                            //                            where tbl.CodigoReserva == oItem.CodigoReserva
                            //                            select tbl).FirstOrDefault();

                            //    if (oReserva != null) oReserva.EstadoReserva = 1;
                            //}              

                            oContext.SaveChanges();
                            boolResult = true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Json(boolResult);
        }

        public ViewResult SinReservaBusqueda(DTOGCP_Cliente poItem = null)
        {
            if (poItem == null) poItem = new DTOGCP_Cliente();

            Session["ReservaDatos"] = null;

            return View(poItem);
        }

        public ViewResult SinReservaRegistro()
        {
            DTOGCP_Cliente poItem = new DTOGCP_Cliente();

            if (Session["ReservaDatos"] != null) poItem = (DTOGCP_Cliente)Session["ReservaDatos"];

            return View(poItem);
        }

        public JsonResult GenerarSesion(DTOGCP_Cliente poItem)
        {
            String strMensaje = String.Empty;
            Int32 intExiste = 0;

            try
            {
                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    foreach (DTOGHA_Reserva oItem in poItem.lstReserva)
                    {
                        intExiste = (from tbl in oContext.GHA_Hospedaje
                                     where tbl.CodigoMascota == oItem.CodigoMascota
                                     && tbl.EstadoHospedaje == 1
                                     select tbl).Count();

                        if (intExiste > 0)
                        {
                            strMensaje = String.Format("La mascota '{0}' ya tiene un hospedaje en curso", oItem.NombreMascota);
                            break;
                        }
                    }

                    if (strMensaje.Length == 0) Session["ReservaDatos"] = poItem;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Json(strMensaje);
        }

        [HttpPost]
        public JsonResult ListarDetalle()
        {
            List<DTOGHA_Reserva> lst = new List<DTOGHA_Reserva>();
            JsonResponse oItemResponse = new JsonResponse();

            try
            {
                if (Session["ReservaDatos"] != null) lst = ((DTOGCP_Cliente)Session["ReservaDatos"]).lstReserva;

                oItemResponse = oItemResponse.Serialization(lst);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Json(lst);
        }

        public ActionResult Reservar(DTOGHA_Reserva poItem)
        {
            try
            {
                DTOGCP_Cliente oItem = (DTOGCP_Cliente)Session["ReservaDatos"];

                List<DTOGHA_Reserva> lst = oItem.lstReserva;

                foreach (DTOGHA_Reserva oReserva in lst)
                {
                    if (oReserva.CodigoMascota == poItem.CodigoMascota)
                    {
                        oReserva.CodigoLugar = poItem.CodigoLugar;
                        oReserva.DescripcionLugar = poItem.DescripcionLugar;
                        oReserva.FechaInicio = poItem.FechaInicio;
                        oReserva.FechaFin = poItem.FechaFin;
                    }
                }

                oItem.lstReserva = lst;

                Session["ReservaDatos"] = oItem;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return RedirectToAction("SinReservaRegistro");
        }

        public ActionResult SinReservaGrabar(DTOGCP_Cliente poItem)
        {
            DTOGCP_Cliente oItem = new DTOGCP_Cliente();

            try
            {
                oItem = (DTOGCP_Cliente)Session["ReservaDatos"];

                using (TransactionScope oAmbito = new TransactionScope())
                {
                    using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                    {
                        foreach (DTOGHA_Reserva oReserva in oItem.lstReserva)
                        {
                            if (oReserva.CodigoLugar == 0) continue;

                            oContext.usp_GrabarHospedaje(null, oItem.CodigoCliente, oReserva.CodigoMascota, oReserva.CodigoLugar, oReserva.FechaInicio, oReserva.FechaFin);
                        }
                    }

                    oAmbito.Complete();
                }

                TempData["Mensaje"] = "Se realizó registro de hospedaje con éxito";

                Session["ReservaDatos"] = null;
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(String.Empty, ex.Message);
            }

            return View("SinReservaBusqueda", oItem);
        }
    }
}
