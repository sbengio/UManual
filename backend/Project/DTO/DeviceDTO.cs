using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DeviceDTO
    {
        public long Id { get; set; }
        public long DeviceTypeId { get; set; }
        public string DeviceType { get; set; }
        public long DeviceBrandId { get; set; }
        public string DeviceBrand { get; set; }
        public string Model { get; set; }
    }
}
