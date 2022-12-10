using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ViewDTO
    {
        public long ID { get; set; }
        public System.DateTime Date { get; set; }
        public long VideoId { get; set; }
        public long UploaderId { get; set; }
    }
}
