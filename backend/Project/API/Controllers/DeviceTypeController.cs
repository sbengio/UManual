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
    [EnableCors("*","*","*")]
    public class DeviceTypeController : ApiController
    {
        DeviceTypeBLL deviceTypeBLL = new DeviceTypeBLL();
        [HttpPost]
        public void AddDeviceType(DeviceTypeDTO deviceType)
        {
            deviceTypeBLL.AddDeviceType(deviceType);
        }
        [HttpGet]
        public long GetDeviceTypesIdByType(string type)
        {
            return deviceTypeBLL.GetDeviceTypesIdByType(type);
        }
        [HttpGet]
        public List<DeviceTypeDTO> GetDeviceTypes()
        {
            return deviceTypeBLL.GetDeviceTypes();
        }
    }
}
