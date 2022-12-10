using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class DevicesDAL
    {
        public bool AddDevice(Device device)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Devices.Add(device);
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            return true;
        }
       
        public List<Device> GetAllDevices()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Devices.Include(d=>d.DeviceBrand)
                    .Include(d=>d.DeviceType)
                    .ToList();
            }
        }

        public List<Device> GetDevicesByDetails(int deviceTypeId, int deviceBrandId)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return GetAllDevices().Where(a => a.DeviceTypeId == deviceTypeId && a.DeviceBrandId == deviceBrandId).ToList();
            }
        }
    }
}
