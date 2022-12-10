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

    public class DeviceBrandController : ApiController
    {
        DeviceBrandBLL DeviceBrandBLL = new DeviceBrandBLL();
        [HttpPost]
        public void AddDeviceBrand(DeviceBrandDTO deviceBrand)
        {
            DeviceBrandBLL.AddDeviceBrand(deviceBrand);
        }
        [HttpGet]
        public long GetDeviceBrandIdByBrand(string brand)
        {
            return DeviceBrandBLL.GetDeviceBrandIdByBrand(brand);
        }
        [HttpGet]
        public List<DeviceBrandDTO> GetDeviceBrands()
        {
            return DeviceBrandBLL.GetDeviceBrands();
        }
        [HttpGet]
        public List<DeviceBrandDTO> GetDeviceBrandsByType(int deviceTypeId)
        {
            return DeviceBrandBLL.GetDeviceBrandsByType(deviceTypeId);
        }
    }
}
