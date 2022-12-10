using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class UploaderTimeBLL
    {
        UploaderTimesDAL uploaderTimesDAL = new UploaderTimesDAL();
        UploaderBLL UploaderBLL = new UploaderBLL();
        public bool AddUploaderTime(UploaderTimeDTO uploaderTimeDTO)
        {
            UploaderTime uploaderTime = CONVERTERS.UploaderTimeConverter.ConvertDTOToUploaderTime(uploaderTimeDTO);
            return uploaderTimesDAL.AddUploaderTime(uploaderTime);
        }
        public void UpdateUploaderTime(UploaderTimeDTO uploaderTime)
        {
            uploaderTimesDAL.UpdateUploaderTime(CONVERTERS.UploaderTimeConverter.ConvertDTOToUploaderTime(uploaderTime));
        }

        public List<UploaderTimeDTO> GetUploaderTimesByUploader(long id)
        {
            return CONVERTERS.UploaderTimeConverter.ConvertUploaderTimeToDTO(uploaderTimesDAL.GetUploaderTimesByUploader(id));
        }

        public bool IsSupport(DateTime timeNow, long uploaderId)
        {
            //finds uploader with id
            UploaderDTO uploader = UploaderBLL.GetAllUploaders().Find(a => a.Id == uploaderId);
            //converts timeNow to uploaders timezone
            DateTime convertedTime = TimeZoneInfo.ConvertTime(timeNow, TimeZoneInfo.FindSystemTimeZoneById(uploader.Timezone));
            List<UploaderTimeDTO> list = CONVERTERS.UploaderTimeConverter.ConvertUploaderTimeToDTO(uploaderTimesDAL.GetUploaderTimesByUploader(uploaderId));
            //iterates through each time range and returns true if convertedTime is included in any time range if not returns false
            foreach (UploaderTimeDTO item in list)
            {
                if (convertedTime.Hour > item.Start.Hour && convertedTime.Hour < item.End.Hour)
                    return true;
                else if (convertedTime.Hour == item.Start.Hour && convertedTime.Minute > item.Start.Minute)
                    return true;
                else if (convertedTime.Hour == item.End.Hour && convertedTime.Minute < item.End.Minute)
                    return true;
            }
            return false;
        }

        public void removeUploaderTimeforUploader(long id)
        {
            uploaderTimesDAL.removeUploaderTimeforUploader(id);
        }

        public void RemoveUploaderTime(UploaderTimeDTO uploaderTime)
        {
            uploaderTimesDAL.RemoveUploaderTime(CONVERTERS.UploaderTimeConverter.ConvertDTOToUploaderTime(uploaderTime));
        }
        public List<UploaderTimeDTO> GetUploaderTimes()
        {
            return CONVERTERS.UploaderTimeConverter.ConvertUploaderTimeToDTO(uploaderTimesDAL.GetAllUploaderTimes());
        }
    }
}
