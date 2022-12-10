using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DeviceTypeDAL
    {
        public bool AddDeviceType(DeviceType deviceType)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.DeviceTypes.Add(deviceType);
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

        public List<DeviceType> GetAllDeviceTypes()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.DeviceTypes.ToList();
            }
        }
    }
}
