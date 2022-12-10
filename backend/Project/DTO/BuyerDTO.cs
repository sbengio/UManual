using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class BuyerDTO
    {
        public long BuyerId { get; set; }
        public string Name { get; set; }
        public int CreditCardNumbers { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
