using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class UploaderLanguagesDAL
    {
        public bool AddUploaderLanguages()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                //db.Devices.Add(device);
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
    }
}
