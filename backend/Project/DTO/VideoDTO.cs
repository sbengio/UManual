using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class VideoDTO
    {
        public long VideoId { get; set; }
        public long UploaderId { get; set; }
        public string UploaderName { get; set; }
        public long DeviceId { get; set; }
        public string DeviceBrand { get; set; }
        public string DeviceType { get; set; }
        public string Model { get; set; }
        public long LanguageId { get; set; }
        public string Language { get; set; }
        public string LanguageCode { get; set; }
        public long Views { get; set; }
        public bool Blocked { get; set; }
        public string Url { get; set; }
        public string SubUrl { get; set; }
        public decimal Price { get; set; }
        public bool Approved { get; set; }
        public DateTime Date { get; set; }
        public double AverageRating { get; set; }
        public double Duration { get; set; }
        public bool Support { get; set; }
        public string Phone { get; set; }
        public bool Disabled { get; set; }
        public List<LanguageDTO> Languages { get; set; } = new List<LanguageDTO>();
        public List<UploaderTimeDTO> UploaderTimes { get; set; } = new List<UploaderTimeDTO>();
    }
}
