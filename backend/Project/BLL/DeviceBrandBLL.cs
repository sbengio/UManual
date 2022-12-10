using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class DeviceBrandBLL
    {
        DeviceBrandDAL DeviceBrandDAL = new DeviceBrandDAL();
        public bool AddDeviceBrand(DeviceBrandDTO deviceBrandDTO)
        {
            DeviceBrandDTO brandDTO = GetDeviceBrands().Find(a => a.Brand == deviceBrandDTO.Brand);
            if (brandDTO == null)
            {
                DeviceBrand deviceBrand = CONVERTERS.DeviceBrandConverter.ConvertDTOTodeviceBrand(deviceBrandDTO);
                return DeviceBrandDAL.AddDeviceBrand(deviceBrand);
            }
            return false;
        }
        public List<DeviceBrandDTO> GetDeviceBrands()
        {
            return CONVERTERS.DeviceBrandConverter.ConvertDeviceBrandsToDTO(DeviceBrandDAL.GetAllDeviceBrands());
        }

        public long GetDeviceBrandIdByBrand(string brand)
        {
            DeviceBrandDTO deviceBrand = GetDeviceBrands().Find(a => a.Brand == brand);
            return deviceBrand.Id;
        }

        public List<DeviceBrandDTO> GetDeviceBrandsByType(int deviceTypeId)
        {
            return CONVERTERS.DeviceBrandConverter.ConvertDeviceBrandsToDTO(DeviceBrandDAL.GetDeviceBrandsByType(deviceTypeId));
        }

    }
}
