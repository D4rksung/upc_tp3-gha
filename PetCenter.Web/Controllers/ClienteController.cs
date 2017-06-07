using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PetCenter.Web.Models;
using PetCenter.Web.Clases;

namespace PetCenter.Web.Controllers
{
    public class ClienteController : Controller
    {
        public ViewResult Busqueda(Int32 id = 0)
        {
            if (id == 0)
            {
                ViewBag.Accion = "Busqueda";
                ViewBag.Controlador = "Reserva";
            }
            else if(id == 1)
            {
                ViewBag.Accion = "SinReservaBusqueda";
                ViewBag.Controlador = "Hospedaje";
            }

            return View();
        }

        [HttpPost]
        public JsonResult Listar(DTOGCP_Cliente poItem)
        {
            List<DTOGCP_Cliente> lst = new List<DTOGCP_Cliente>();
            JsonResponse oItemResponse = new JsonResponse();

            try
            {
                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    lst = (from tbl in oContext.GCP_Cliente
                           where tbl.NombreCliente.Contains(poItem.NombreCliente)
                           select new DTOGCP_Cliente
                           {
                               CodigoCliente = tbl.CodigoCliente,
                               NombreCliente = tbl.NombreCliente,
                               DireccionCliente = tbl.DireccionCliente
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
    }
}
