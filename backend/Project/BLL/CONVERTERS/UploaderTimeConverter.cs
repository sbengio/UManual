using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class UploaderTimeConverter
    {
        public static UploaderTime ConvertDTOToUploaderTime(UploaderTimeDTO uploaderTime)
        {
            return new UploaderTime
            {
                Id = uploaderTime.Id,
                UploaderId = uploaderTime.UploaderId,
                Start = uploaderTime.Start,
                End = uploaderTime.End
            };
        }
        public static UploaderTimeDTO ConvertUploaderTimeToDTO(UploaderTime uploaderTime)
        {
            return new UploaderTimeDTO
            {
                Id = uploaderTime.Id,
                UploaderId = uploaderTime.UploaderId,
                Start = uploaderTime.Start,
                End = uploaderTime.End
            };
        }
        public static List<UploaderTimeDTO> ConvertUploaderTimeToDTO(List<UploaderTime> uploaderTimes)
        {
            return uploaderTimes.Select(a => ConvertUploaderTimeToDTO(a)).ToList();
        }
    }
}
