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
    public class ReservaController : Controller
    {
        public ViewResult Busqueda(DTOGCP_Cliente poItem = null)
        {
            if (poItem == null) poItem = new DTOGCP_Cliente();

            Session["ReservaDatos"] = null;

            return View(poItem);
        }

        [HttpPost]
        public JsonResult Listar(DTOGHA_Reserva poItem)
        {
            List<DTOGHA_Reserva> lst = new List<DTOGHA_Reserva>();
            JsonResponse oItemResponse = new JsonResponse();

            try
            {
                DateTime dtHoy = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    lst = (from tbl in oContext.GHA_Reserva
                           where tbl.CodigoCliente == poItem.CodigoCliente
                           && tbl.EstadoReserva == (poItem.EstadoReserva == 0 ? tbl.EstadoReserva : poItem.EstadoReserva)
                           && tbl.EstadoReserva != 2
                           select new DTOGHA_Reserva
                           {
                               CodigoReserva = tbl.CodigoReserva,
                               CodigoMascota = tbl.CodigoMascota,
                               NombreMascota = tbl.GCP_Mascota.NombreMascota,
                               NombreRaza = tbl.GCP_Mascota.GCP_Raza.NombreRaza,
                               DescripcionEspecie = tbl.GCP_Mascota.GCP_Raza.GCP_Especie.DescripcionEspecie,
                               FechaInicio = tbl.GHA_Lugar_Reserva.FirstOrDefault().FechaInicio,
                               FechaFin = tbl.GHA_Lugar_Reserva.FirstOrDefault().FechaFin,
                               CodigoLugar = tbl.GHA_Lugar_Reserva.FirstOrDefault().CodigoLugar,
                               DescripcionLugar = tbl.GHA_Lugar_Reserva.FirstOrDefault().GHA_Lugar.DescripcionLugar,
                               EstadoReserva = tbl.EstadoReserva
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
        public JsonResult ListarFechaActual(DTOGHA_Reserva poItem)
        {
            List<DTOGHA_Reserva> lst = new List<DTOGHA_Reserva>();
            JsonResponse oItemResponse = new JsonResponse();

            try
            {
                DateTime dtHoy = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);

                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    lst = (from tbl in oContext.GHA_Lugar_Reserva
                           where tbl.GHA_Reserva.CodigoCliente == poItem.CodigoCliente
                           && tbl.GHA_Reserva.EstadoReserva == (poItem.EstadoReserva == 0 ? tbl.GHA_Reserva.EstadoReserva : poItem.EstadoReserva)
                           && tbl.GHA_Reserva.EstadoReserva != 2
                           && tbl.FechaInicio == dtHoy
                           group tbl by tbl.GHA_Reserva.CodigoReserva into grp
                           select new DTOGHA_Reserva
                           {
                               CodigoReserva = grp.Key,
                               CodigoMascota = grp.Max(x=>x.GHA_Reserva.CodigoMascota),
                               NombreMascota = grp.Max(x=>x.GHA_Reserva.GCP_Mascota.NombreMascota),
                               NombreRaza = grp.Max(x=>x.GHA_Reserva.GCP_Mascota.GCP_Raza.NombreRaza),
                               DescripcionEspecie = grp.Max(x=>x.GHA_Reserva.GCP_Mascota.GCP_Raza.GCP_Especie.DescripcionEspecie),
                               FechaInicio = grp.Max(x=>x.GHA_Reserva.GHA_Lugar_Reserva.FirstOrDefault().FechaInicio),
                               FechaFin = grp.Max(x=>x.GHA_Reserva.GHA_Lugar_Reserva.FirstOrDefault().FechaFin),
                               CodigoLugar = grp.Max(x=>x.GHA_Reserva.GHA_Lugar_Reserva.FirstOrDefault().CodigoLugar),
                               DescripcionLugar = grp.Max(x=>x.GHA_Reserva.GHA_Lugar_Reserva.FirstOrDefault().GHA_Lugar.DescripcionLugar),
                               EstadoReserva = grp.Max(x=>x.GHA_Reserva.EstadoReserva)
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
                        intExiste = (from tbl in oContext.GHA_Reserva
                                           where tbl.CodigoMascota == oItem.CodigoMascota
                                           && tbl.EstadoReserva == 1
                                           select tbl).Count();

                        if (intExiste > 0)
                        {
                            strMensaje = String.Format("La mascota '{0}' ya tiene una reserva en curso", oItem.NombreMascota);
                            break;
                        }

                        //intExiste = (from tbl in oContext.GHA_Hospedaje
                        //             where tbl.CodigoMascota == oItem.CodigoMascota
                        //             && tbl.EstadoHospedaje == 1
                        //             select tbl).Count();

                        //if (intExiste > 0)
                        //{
                        //    strMensaje = String.Format("La mascota '{0}' ya tiene un hospedaje en curso", oItem.NombreMascota);
                        //    break;
                        //}
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

        public ViewResult Registro()
        {
            DTOGCP_Cliente poItem = new DTOGCP_Cliente();

            if (Session["ReservaDatos"] != null) poItem = (DTOGCP_Cliente)Session["ReservaDatos"];

            return View(poItem);
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

        public ViewResult LugarReserva(Int32 id, Int32 id2 = 0)
        {
            DTOGHA_Reserva oItem = new DTOGHA_Reserva()
            {
                CodigoMascota = id,
                FechaInicio = DateTime.Now,
                FechaFin = DateTime.Now
            };

            if (id2 == 0)
            {
                ViewBag.Accion = "Reservar";
                ViewBag.Controlador = "Reserva";

                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    DTOGHA_Hospedaje oHospedaje = (from tbl in oContext.GHA_Hospedaje
                                              where tbl.CodigoMascota == id
                                              && tbl.EstadoHospedaje == 1
                                              select new DTOGHA_Hospedaje
                                              {
                                                  FechaFin = tbl.GHA_Lugar_Hospedaje.FirstOrDefault().FechaFin
                                              }).FirstOrDefault();

                    if (oHospedaje != null)
                    {
                        oHospedaje.FechaFin = oHospedaje.FechaFin.AddDays(1);

                        if (oHospedaje.FechaFin < DateTime.Now.AddDays(2))
                        {
                            ViewBag.FechaInicio = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy");
                        }
                        else
                        {
                            ViewBag.FechaInicio = oHospedaje.FechaFin.ToString("dd/MM/yyyy");
                        }
                    }
                    else
                    {
                        ViewBag.FechaInicio = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy");
                    }
                }
            }
            else if (id2 == 1)
            {
                ViewBag.Accion = "Reservar";
                ViewBag.Controlador = "Hospedaje";

                ViewBag.FechaInicio = DateTime.Now.ToString("dd/MM/yyyy");
            }

            return View(oItem);
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

            return RedirectToAction("Registro");
        }

        public ActionResult Grabar()
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

                            oContext.usp_GrabarReserva(oItem.CodigoCliente, oReserva.CodigoMascota, oReserva.CodigoLugar, oReserva.FechaInicio, oReserva.FechaFin);
                        }
                    }

                    oAmbito.Complete();
                }

                TempData["Mensaje"] = "Reserva exitosa";

                Session["ReservaDatos"] = null;
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(String.Empty, ex.Message);
            }

            return View("Busqueda", oItem);
        }

        public JsonResult Anular(DTOGHA_Reserva poItem)
        {
            Boolean boolResult = false;

            try
            {
                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    GHA_Reserva oItem = (from tbl in oContext.GHA_Reserva
                                         where tbl.CodigoReserva == poItem.CodigoReserva
                                         select tbl).FirstOrDefault();

                    if (oItem != null)
                    {
                        oItem.EstadoReserva = 3;

                        GHA_Lugar_Reserva oLugarReserva = oItem.GHA_Lugar_Reserva.FirstOrDefault();

                        if (oLugarReserva != null)
                        {
                            List<GHA_Lugar_Estado> lst = (from tbl in oContext.GHA_Lugar_Estado
                                                          where tbl.CodigoLugar == oLugarReserva.CodigoLugar
                                                             && tbl.FechaDia >= oLugarReserva.FechaInicio
                                                             && tbl.FechaDia <= oLugarReserva.FechaFin
                                                          select tbl).ToList();

                            foreach (GHA_Lugar_Estado oLugar in lst)
                            {
                                oLugar.Estado_lugar = "DISPONIBLE";
                            }

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
    }
}
