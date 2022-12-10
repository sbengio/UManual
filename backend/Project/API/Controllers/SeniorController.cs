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
    public class SeniorController : ApiController
    {
        SeniorBLL SeniorBLL = new SeniorBLL();
        [HttpPost]
        public void AddSenior(SeniorDTO senior)
        {
            SeniorBLL.AddSenior(senior);
        }
    }
}
