using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using PetCenter.BusinessLogic;
using PetCenter.BusinessEntities;
using PetCenter.RESTServices.DTOEntities;
namespace PetCenter.RESTServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "MonitoreoService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select MonitoreoService.svc or MonitoreoService.svc.cs at the Solution Explorer and start debugging.
    public class MonitoreoService : IMonitoreoService
    {
        public List<mascotaHospedadaDTO> listarMascotasPorRecepcionista(string recepcionista)
        {
            List<mascotaHospedadaDTO> listaResultado = new List<mascotaHospedadaDTO>();
            foreach (var mascota in new MonitoreoLogic().listarMascotasPorRecepcionista(string.Empty, int.Parse(recepcionista)).ToList())
            {
                mascotaHospedadaDTO mascotaHospedada = new mascotaHospedadaDTO();
                mascotaHospedada.codigo = mascota.codigo;
                mascotaHospedada.mascota = mascota.nombre.ToUpper();
                mascotaHospedada.cliente = mascota.cliente;
                mascotaHospedada.fechaIngreso = mascota.fechaEntrada;
                listaResultado.Add(mascotaHospedada);
            }
            return listaResultado;
        }

        public List<mascotaHospedadaDTO> listarMascotasPorRecepcionistaFiltro(string filtro, string recepcionista)
        {
            List<mascotaHospedadaDTO> listaResultado = new List<mascotaHospedadaDTO>();
            foreach (var mascota in new MonitoreoLogic().listarMascotasPorRecepcionista(filtro, int.Parse(recepcionista)).ToList())
            {
                mascotaHospedadaDTO mascotaHospedada = new mascotaHospedadaDTO();
                mascotaHospedada.codigo = mascota.codigo;
                mascotaHospedada.mascota = mascota.nombre.ToUpper();
                mascotaHospedada.cliente = mascota.cliente;
                mascotaHospedada.fechaIngreso = mascota.fechaEntrada;
                listaResultado.Add(mascotaHospedada);
            }
            return listaResultado;
        }

        public MascotaBE obtenerDatosMascota(string mascota)
        {
            return new MonitoreoLogic().obtenerDatosMascota(int.Parse(mascota));
        }

        public List<MonitoreoBE> listarMonitoreosPorMascota(string lugarHospedaje, string mascota)
        {
            return new MonitoreoLogic().listarMonitoreosMascota(int.Parse(lugarHospedaje), int.Parse(mascota)).ToList();
        }

        public List<fotoMonitoreoBE> listarFotosMonitoreosPorMascota(string monitoreo)
        {
            return new MonitoreoLogic().listarFotosMonitoreoMascota(int.Parse(monitoreo)).ToList();
        }

        public MonitoreoBE registrarMonitoreo(MonitoreoBE monitoreo) {
            return new MonitoreoLogic().registrarMonitoreo(monitoreo);
        }

        public fotoMonitoreoBE registrarFotoMonitoreo(fotoMonitoreoBE fotoMonitoreo) {
            return new MonitoreoLogic().registrarFotoMonitoreo(fotoMonitoreo);    
        }
    }
}
