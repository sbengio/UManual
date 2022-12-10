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
    public class BuyerController : ApiController
    {
        BuyerBLL buyerBLL = new BuyerBLL();
        [HttpGet]
        public BuyerDTO Login(string email, string password)
        {
            return buyerBLL.Login(email, password);
        }
        [HttpPost]
        public void AddBuyer(BuyerDTO buyer)
        {
            buyerBLL.AddBuyer(buyer);
        }
        [HttpGet]
        public List<BuyerDTO> GetBuyers()
        {
            return buyerBLL.GetBuyers();
        }
        [HttpPut]
        public void Resetpassword(string par)
        {
            string email = par.Split(' ')[0];
            string password = par.Split(' ')[1];
            buyerBLL.Resetpassword(email, password);
        }
        [HttpGet]
        public bool Exist(string email, string password)
        {
            return buyerBLL.Exist(email, password);
        }
        [HttpGet]
        public bool buyerexists(string email)
        {
            return buyerBLL.buyerexists(email);
        }
    }
}
