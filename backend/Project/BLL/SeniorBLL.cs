using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
namespace BLL
{
    public class SeniorBLL
    {
        SeniorDAL seniorDAL = new SeniorDAL();
        public bool AddSenior(SeniorDTO seniorDTO)
        {
            if (GetSeniors().Find(a => a.IP_Address == seniorDTO.IP_Address) == null)
            {
                Senior senior = CONVERTERS.SeniorConverter.ConvertDTOToSenior(seniorDTO);
                return seniorDAL.AddSenior(senior);
            }
            return true;
        }
        public List<SeniorDTO> GetSeniors()
        {
            return CONVERTERS.SeniorConverter.ConvertSeniorsToDTO(seniorDAL.GetAllSeniors());
        }
    }
}
