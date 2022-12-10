using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class DeviceBrandConverter
    {
        public static DeviceBrand ConvertDTOTodeviceBrand(DeviceBrandDTO deviceBrand)
        {
            return new DeviceBrand
            {
                Id=deviceBrand.Id,
                Brand=deviceBrand.Brand
            };
        }
        public static DeviceBrandDTO ConvertdeviceBrandToDTO(DeviceBrand deviceBrand)
        {
            return new DeviceBrandDTO
            {
                Id = deviceBrand.Id,
                Brand = deviceBrand.Brand
            };
        }
        public static List<DeviceBrandDTO> ConvertDeviceBrandsToDTO(List<DeviceBrand> deviceBrands)
        {
            return deviceBrands.Select(v => ConvertdeviceBrandToDTO(v)).ToList();
        }
    }
}
