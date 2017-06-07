using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PetCenter.Web.Models;
using PetCenter.Web.Clases;

namespace PetCenter.Web.Controllers
{
    public class MascotaController : Controller
    {
        public ViewResult Busqueda(Int32 id = 0)
        {
            if (id == 0)
            {
                ViewBag.Accion = "Registro";
                ViewBag.Controlador = "Reserva";
            }
            else if (id == 1)
            {
                ViewBag.Accion = "SinReservaRegistro";
                ViewBag.Controlador = "Hospedaje";
            }

            return View();
        }

        [HttpPost]
        public JsonResult Listar(DTOGCP_Mascota poItem)
        {
            List<DTOGCP_Mascota> lst = new List<DTOGCP_Mascota>();
            JsonResponse oItemResponse = new JsonResponse();

            try
            {
                using (BDPetCenterEntities oContext = new BDPetCenterEntities())
                {
                    lst = (from tbl in oContext.GCP_Mascota
                           where tbl.CodigoCliente == poItem.CodigoCliente
                           select new DTOGCP_Mascota
                           {
                               CodigoMascota = tbl.CodigoMascota,
                               NombreMascota = tbl.NombreMascota,
                               NombreRaza = tbl.GCP_Raza.NombreRaza,
                               DescripcionEspecie = tbl.GCP_Raza.GCP_Especie.DescripcionEspecie
                           }).ToList();
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
