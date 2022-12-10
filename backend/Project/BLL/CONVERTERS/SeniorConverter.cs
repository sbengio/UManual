using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class SeniorConverter
    {
        public static Senior ConvertDTOToSenior(SeniorDTO senior)
        {
            return new Senior
            {
                IP_Address = senior.IP_Address
            };
        }
        public static SeniorDTO ConvertSeniorToDTO(Senior senior)
        {
            return new SeniorDTO
            {
                IP_Address = senior.IP_Address
            };
        }
        public static List<SeniorDTO> ConvertSeniorsToDTO(List<Senior> seniors)
        {
            return seniors.Select(v => ConvertSeniorToDTO(v)).ToList();
        }
    }
}
