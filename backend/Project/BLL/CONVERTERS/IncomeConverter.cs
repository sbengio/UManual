using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL.CONVERTERS
{
    public class IncomeConverter
    {
        public static Income ConvertDTOToIncome(IncomeDTO income)
        {
            return new Income
            {
                BuyerId = income.BuyerId,
                VideoId = income.VideoId,
                Id = income.Id,
                Date = income.Date
            };
        }
        public static IncomeDTO ConvertIncomeToDTO(Income income)
        {
            return new IncomeDTO
            {
                BuyerId = income.BuyerId,
                VideoId = income.VideoId,
                Id = income.Id,
                Date = income.Date,
                DeviceBrand = income.Video.Device.DeviceBrand.Brand,
                DeviceType = income.Video.Device.DeviceType.Type,
                Model = income.Video.Device.Model,
                AverageRating = income.Video.AverageRating,
                Views = income.Video.Views,
                Url = income.Video.Url,
                Email = income.Buyer.Email,
                SubUrl=income.Video.SubUrl
            };
        }
        public static List<IncomeDTO> ConvertIncomesToDTO(List<Income> incomes)
        {
            return incomes.Select(v => ConvertIncomeToDTO(v)).ToList();
        }
    }
}
