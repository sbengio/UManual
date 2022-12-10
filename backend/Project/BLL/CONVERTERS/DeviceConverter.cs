using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class DeviceConverter
    {
        public static Device ConvertDTOToDevice(DeviceDTO device)
        {
            return new Device {
                Id = device.Id,
                DeviceTypeId=device.DeviceTypeId,
                DeviceBrandId=device.DeviceBrandId,
                Model=device.Model
            };
        }
        public static DeviceDTO ConvertDeviceToDTO(Device device)
        {
            return new DeviceDTO {
                Id = device.Id,
                DeviceTypeId=device.DeviceTypeId,
                DeviceBrandId=device.DeviceBrandId,
                Model=device.Model,
                DeviceBrand=device.DeviceBrand.Brand,
                DeviceType=device.DeviceType.Type
            };
        }
        public static List<DeviceDTO> ConvertDevicesToDTO(List<Device> devices)
        {
            return devices.Select(v => ConvertDeviceToDTO(v)).ToList();
        }
    }
}
