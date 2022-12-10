using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UploaderDTO
    {
        public long Id { get; set; }
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public bool Support { get; set; }
        public string Timezone { get; set; }
        public decimal Earnings { get; set; }
        public double AverageRating { get; set; }
        public bool Inactive { get; set; }

        public List<LanguageDTO> Languages { get; set; }
    
        public List<UploaderTimeDTO> UploaderTimes { get; set; } = new List<UploaderTimeDTO>();
    }
}
