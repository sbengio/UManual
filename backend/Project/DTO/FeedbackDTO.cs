using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FeedbackDTO
    {
        public long Id { get; set; }
        public string IP_Address { get; set; }
        public long VideoId { get; set; }
        public long PauseCount { get; set; }
        public long BackCount { get; set; }
        public int Stars { get; set; }
        public long Finish { get; set; }
        public long MinutesStopped { get; set; }
    }
}
