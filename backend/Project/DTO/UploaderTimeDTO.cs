using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UploaderTimeDTO
    {
        public long Id { get; set; }
        public long UploaderId { get; set; }
        //public string UploaderName { get; set; }
        public System.DateTime Start { get; set; }
        public System.DateTime End { get; set; }
    }
}
