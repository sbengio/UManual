using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class BuyerDAL
    {
        public bool AddBuyer(Buyer buyer)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Buyers.Add(buyer);
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

        public List<Buyer> GetAllBuyers()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Buyers.ToList();
            }
        }

        public void Resetpassword(string email, string password)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Buyer buyer = db.Buyers.FirstOrDefault(u => u.Email.Equals(email));
                buyer.Password = password;
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }
    }
}
