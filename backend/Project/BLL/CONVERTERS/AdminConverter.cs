using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class AdminConverter
    {
        public static Admin ConvertDTOToAdmin(AdminDTO admin)
        {
            return new Admin
            {
                Id = admin.Id,
                Email = admin.Email,
                Password = admin.Password
            };
        }
        public static AdminDTO ConvertAdminToDTO(Admin admin)
        {
            return new AdminDTO
            {
                Id = admin.Id,
                Email = admin.Email,
                Password = admin.Password
            };
        }
    }
}
