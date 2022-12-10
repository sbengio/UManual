using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class DeviceBLL
    {
        DevicesDAL DevicesDAL = new DevicesDAL();
        public bool AddDevice(DeviceDTO deviceDTO)
        {
            var l = GetDevices();
            DeviceDTO deviceDTO1 = GetDevices().Find(a => a.Model == deviceDTO.Model && a.DeviceBrandId==deviceDTO.DeviceBrandId && a.DeviceTypeId==deviceDTO.DeviceTypeId);
            if (deviceDTO1 == null)
            {
                Device device = CONVERTERS.DeviceConverter.ConvertDTOToDevice(deviceDTO);
                return DevicesDAL.AddDevice(device);
            }
            return false;
        }
        public List<DeviceDTO> GetDevices()
        {
            return CONVERTERS.DeviceConverter.ConvertDevicesToDTO(DevicesDAL.GetAllDevices());
        }

        public List<Device> GetDevicesByFreeStyleSearchText(string searchText)
        {
            try
            {
                string[] searchWords = searchText.Split(' ');
                searchWords = searchWords.Select(w => w.Trim()).ToArray();
                var allBrands = new DeviceBrandDAL().GetAllDeviceBrands();
                var allTypes = new DeviceTypeDAL().GetAllDeviceTypes();
                var allDevices = new DevicesDAL().GetAllDevices();
                //searches for device brand that is equal to any word/s of the searchText
                DeviceBrand selectedBrand = allBrands.SingleOrDefault(b => b.Brand.CompareWithArray(searchWords));
                //searches for device type that is equal to any word/s of the searchText
                DeviceType deviceType = allTypes.SingleOrDefault(b => b.Type.CompareWithArray(searchWords));
                //searches for devices of which their models is equal to any word of the searchText
                List<Device> devices = allDevices.Where(b => b.Model.CompareWithArray(searchWords)).ToList();
                //only model in searchtext
                if (selectedBrand == null && deviceType == null && devices.Count != 0)
                    return devices;
                //only brand in searchtext
                else if (selectedBrand != null && deviceType == null && devices.Count == 0)
                {
                    List<Device> devices1 = allDevices.Where(b => b.DeviceBrand.Brand.Equals(selectedBrand.Brand)).ToList();
                    return devices1;
                }
                //only type in searchtext
                else if (selectedBrand == null && deviceType != null && devices.Count == 0)
                {
                    List<Device> devices1 = allDevices.Where(b => b.DeviceType.Type.Equals(deviceType.Type)).ToList();
                    return devices1;
                }
                //type and brand in searchtext
                else if (selectedBrand != null && deviceType != null && devices.Count == 0)
                {
                    List<Device> devices1 = selectedBrand.Devices.Where(b => b.DeviceType.Type.Equals(deviceType.Type)).ToList();
                    return devices1;
                }
                //type and model in searchtext
                else if (selectedBrand == null && deviceType != null && devices.Count != 0)
                {
                    List<Device> devices1 = devices.Where(b => b.DeviceType.Type.Equals(deviceType.Type)).ToList();
                    return devices1;
                }
                //model and brand in searchtext
                else if (selectedBrand != null && deviceType == null && devices.Count != 0)
                {
                    List<Device> devices1 = devices.Where(b => b.DeviceBrand.Brand.Equals(selectedBrand.Brand)).ToList();
                    return devices1;
                }
                //brand,type and model in searchtext
                else if (selectedBrand != null && deviceType != null && devices.Count != 0)
                {
                    List<Device> optionalModels = selectedBrand.Devices.Where(d => d.Model.CompareWithArray(searchWords)).ToList();
                    List<Device> selectedModel = optionalModels.Where(m => m.DeviceType.Type.CompareWithArray(searchWords)).ToList();
                    return selectedModel;
                }
                else return null;
            }
            catch(Exception e) { throw e; }
            //returns all possible devices according to the values of selectedBrand,deviceType and devices
        }

        public List<DeviceDTO> GetDevicesByDetails(int deviceTypeId,int deviceBrandId)
        {
            return CONVERTERS.DeviceConverter.ConvertDevicesToDTO(DevicesDAL.GetDevicesByDetails(deviceTypeId, deviceBrandId));
        }
        public DeviceDTO GetdeviceByDetails(string model, int devicetypeid, int devicebrandid)
        {
            DeviceDTO device = GetDevices().Find(a => a.Model == model&&a.DeviceTypeId== devicetypeid&&a.DeviceBrandId==devicebrandid);
            return device;
        }
    }
}
