using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL.CONVERTERS
{
    public class BuyerConverter
    {
        public static Buyer ConvertDTOToBuyer(BuyerDTO buyer)
        {
            return new Buyer
            {
                BuyerId = buyer.BuyerId,
                Name = buyer.Name,
                Password=buyer.Password,
                Email=buyer.Email,
                CreditCardNumbers=buyer.CreditCardNumbers,
                Token=buyer.Token
            };
        }
        public static BuyerDTO ConvertBuyerToDTO(Buyer buyer)
        {
            return new BuyerDTO
            {
                BuyerId = buyer.BuyerId,
                Name = buyer.Name,
                Password = buyer.Password,
                Email = buyer.Email,
                CreditCardNumbers = buyer.CreditCardNumbers,
                Token = buyer.Token
            };
        }

        public static List<BuyerDTO> ConvertBuyersToDTO(List<Buyer> buyers)
        {
            return buyers.Select(v => ConvertBuyerToDTO(v)).ToList();
        }

    }
}
