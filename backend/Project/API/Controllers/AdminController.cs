using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using BLL;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class AdminController : ApiController
    {
        AdminBLL AdminBLL = new AdminBLL();
        [HttpGet]
        public bool CheckIfAdmin(string email,string password)
        {
           return AdminBLL.CheckIfAdmin(email,password);
        }
        
    }

}
