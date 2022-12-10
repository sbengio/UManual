using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class IncomeDTO
    {
        public long Id { get; set; }
        public long VideoId { get; set; }
        public long BuyerId { get; set; }
        public string Email { get; set; }
        public string DeviceBrand { get; set; }
        public string DeviceType { get; set; }
        public string Model { get; set; }
        public double AverageRating { get; set; }
        public long Views { get; set; }
        public string Url { get; set; }
        public string SubUrl { get; set; }
        public System.DateTime Date { get; set; }
    }
}
