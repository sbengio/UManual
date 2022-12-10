using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class BuyerBLL
    {
        BuyerDAL BuyerDAL = new BuyerDAL();
        public bool AddBuyer(BuyerDTO buyer)
        {
            BuyerDTO buyerDTO = GetBuyers().Find(a => a.Email == buyer.Email);
            if (buyerDTO == null)
            {
                Buyer buyer1 = CONVERTERS.BuyerConverter.ConvertDTOToBuyer(buyer);
                return BuyerDAL.AddBuyer(buyer1);
            }
            return false;
        }
        public BuyerDTO Login(string email, string password)
        {
            BuyerDTO buyer = GetBuyers().Find(a => a.Email.Equals(email) && a.Password.Equals(password));
            if (buyer == null)
                return null;
            return buyer;
        }
        public List<BuyerDTO> GetBuyers()
        {
            return CONVERTERS.BuyerConverter.ConvertBuyersToDTO(BuyerDAL.GetAllBuyers());
        }

        public void Resetpassword(string email, string password)
        {
            BuyerDAL.Resetpassword(email, password);
        }

        public bool Exist(string email, string password)
        {
            BuyerDTO buyer = GetBuyers().Find(a => a.Email.Equals(email) && a.Password.Equals(password));
            if (buyer == null)
                return false;
            return true;
        }
        public bool buyerexists(string email)
        {
            if (GetBuyers().Find(u => u.Email.Equals(email)) == null)
                return false;
            return true;
        }
    }
}
