using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using BLL;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]

    public class DeviceController : ApiController
    {
        DeviceBLL DeviceBLL = new DeviceBLL();
        [HttpPost]
        public void AddDevice(DeviceDTO device)
        {
            DeviceBLL.AddDevice(device);
        }
        [HttpGet]
        public List<DeviceDTO> GetDevices()
        {
            return DeviceBLL.GetDevices();
        }
        [HttpGet]
        public List<DeviceDTO> GetDevicesByDetails(int devicetypeid,int devicebrandid)
        {
            return DeviceBLL.GetDevicesByDetails(devicetypeid,devicebrandid);
        }
        public DeviceDTO GetdeviceByDetails(string model, int devicetypeid, int devicebrandid)
        {
            return DeviceBLL.GetdeviceByDetails(model, devicetypeid, devicebrandid);
        }

       
    }
}
