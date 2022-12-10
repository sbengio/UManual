using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class DeviceTypeBLL
    {
        DeviceTypeDAL DeviceTypeDAL = new DeviceTypeDAL();
        public bool AddDeviceType(DeviceTypeDTO deviceTypeDTO)
        {
            DeviceTypeDTO typeDTO = GetDeviceTypes().Find(a => a.Type == deviceTypeDTO.Type);
            if (typeDTO == null)
            {
                DeviceType deviceType = CONVERTERS.DeviceTypeConverter.ConvertDTOToDeviceType(deviceTypeDTO);
                return DeviceTypeDAL.AddDeviceType(deviceType);
            }
            return false;
        }
        public List<DeviceTypeDTO> GetDeviceTypes()
        {
            return CONVERTERS.DeviceTypeConverter.ConvertDeviceTypesToDTO(DeviceTypeDAL.GetAllDeviceTypes());
        }

        public long GetDeviceTypesIdByType(string type)
        {
            DeviceTypeDTO deviceType = GetDeviceTypes().Find(a => a.Type == type);
            return deviceType.Id;
        }
    }
}
