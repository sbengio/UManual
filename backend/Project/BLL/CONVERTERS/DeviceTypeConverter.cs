using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class DeviceTypeConverter
    {
        public static DeviceType ConvertDTOToDeviceType(DeviceTypeDTO deviceType)
        {
            return new DeviceType
            {
                Id = deviceType.Id,
                Type = deviceType.Type
            };
        }
        public static DeviceTypeDTO ConvertDeviceTypeToDTO(DeviceType deviceType)
        {
            return new DeviceTypeDTO
            {
                Id = deviceType.Id,
                Type = deviceType.Type
            };
        }
        public static List<DeviceTypeDTO> ConvertDeviceTypesToDTO(List<DeviceType> deviceTypes)
        {
            return deviceTypes.Select(v => ConvertDeviceTypeToDTO(v)).ToList();
        }
    }
}
