using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DTO;
using BLL;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class IncomeController : ApiController
    {
        IncomeBLL IncomeBLL = new IncomeBLL();
        [HttpPost]
        public void AddIncome(IncomeDTO income)
        {
            IncomeBLL.AddIncome(income);
        }
        [HttpGet]
        public List<IncomeDTO> GetIncomes()
        {
            return IncomeBLL.GetIncomes();
        }
        [HttpGet]
        public List<IncomeDTO> GetAllIncomesBybuyerid(long id)
        {
            return IncomeBLL.GetAllIncomesBybuyerid(id);
        }
        [HttpGet]
        public List<VideoDTO> FreeStyleSearch(string text,long id)
        {
            return IncomeBLL.FreeStyleSearch(text,id);
        }
        [HttpGet]
        public List<VideoDTO> Search(long deviceId, long id)
        {
            return IncomeBLL.Search(deviceId, id);
        }
    }
}
