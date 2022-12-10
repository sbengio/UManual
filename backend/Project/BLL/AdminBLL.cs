using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL
{
    public class AdminBLL
    {
        AdminDAL AdminDAL = new AdminDAL();

        public bool CheckIfAdmin(string email, string password)
        {
            return AdminDAL.CheckIfAdmin(email,password);
        }
       
    }
}
