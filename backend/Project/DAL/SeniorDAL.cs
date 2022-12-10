using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class SeniorDAL
    {
        public bool AddSenior(Senior senior)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Seniors.Add(senior);
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

        public List<Senior> GetAllSeniors()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Seniors.ToList();
            }
        }
    }
}
