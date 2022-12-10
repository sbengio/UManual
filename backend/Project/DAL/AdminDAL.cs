using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AdminDAL
    {
        public bool CheckIfAdmin(string email, string password)
        {
           using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
           {
                List<Admin> admins= db.Admins.ToList();
                foreach (var item in admins)
                {
                     if (email.Equals(item.Email) && password == item.Password)
                          return true;
                }
           }
            return false;
        }

    }
}
