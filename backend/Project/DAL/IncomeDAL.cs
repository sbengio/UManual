using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class IncomeDAL
    {
        public bool AddIncome(Income income)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Incomes.Add(income);
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

        public List<Income> GetAllIncomes()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Incomes
                    .Include(a=>a.Video)
                    .Include(a=>a.Buyer)
                    .Include(a=>a.Video.Device)
                    .Include(a=>a.Video.Device.DeviceType)
                    .Include(a=>a.Video.Device.DeviceBrand)
                    .ToList();
            }
        }

        public List<Income> GetIncomesOfBuyer(long id)
        {
            return GetAllIncomes().Where(a => a.BuyerId == id).ToList();
        }
    }
}
