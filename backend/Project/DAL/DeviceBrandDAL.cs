using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class DeviceBrandDAL
    {
        public bool AddDeviceBrand(DeviceBrand deviceBrand)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.DeviceBrands.Add(deviceBrand);
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

        public List<DeviceBrand> GetAllDeviceBrands()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.DeviceBrands.Include(b=>b.Devices)
                    .Include("Devices.DeviceType")
                    
                    .ToList();
            }
        }

        public List<DeviceBrand> GetDeviceBrandsByType(int deviceTypeId)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.DeviceBrands.Where(b=>b.Devices.Any(d=>d.DeviceTypeId==deviceTypeId)).ToList();
            }
        }

    }
}
