using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class VideoConverter
    {

        public static Video ConvertDTOToVideo(VideoDTO video)
        {
            return new Video
            {
                Approved = video.Approved,
                Blocked = video.Blocked,
                VideoId = video.VideoId,
                UploaderId = video.UploaderId,
                DeviceId = video.DeviceId,
                LanguageId = video.LanguageId,
                Views = video.Views,
                Url = video.Url,
                SubUrl = video.SubUrl,                
                Price=video.Price,
                Date=video.Date,
                AverageRating=video.AverageRating,
                Duration=video.Duration,
                Disabled=video.Disabled
            };
        }

        public static VideoDTO ConvertVideoToDTO(Video video)
        {
            return new VideoDTO
            {
                Approved = video.Approved,
                Blocked = video.Blocked,
                UploaderName = video.Uploader.Firstname,
                VideoId = video.VideoId,
                UploaderId = video.UploaderId,
                DeviceId = video.DeviceId,
                LanguageId = video.LanguageId,
                Views = video.Views,
                Url = video.Url,
                SubUrl = video.SubUrl,
                Price = video.Price,
                DeviceBrand = video.Device.DeviceBrand.Brand,
                DeviceType = video.Device.DeviceType.Type,
                Model = video.Device.Model,
                Language = video.Language.LanguageName,
                LanguageCode=video.Language.Code,
                Date = video.Date,
                AverageRating = video.AverageRating,
                Duration = video.Duration,
                Support = video.Uploader.Support,
                Phone = video.Uploader.Phone,
                Disabled=video.Disabled,
                Languages = video.Uploader.Languages.Select(l => LanguageConverter.ConvertLanguageToDTO(l)).ToList(),
                UploaderTimes = convertTimes(video)
            };
        }
        public static List<UploaderTimeDTO> convertTimes(Video video) {
            List<UploaderTimeDTO> UploaderTimes = video.Uploader.UploaderTimes.Select(l => UploaderTimeConverter.ConvertUploaderTimeToDTO(l)).ToList();
            foreach (var item in UploaderTimes)
            {
                item.Start= TimeZoneInfo.ConvertTime(item.Start, TimeZoneInfo.FindSystemTimeZoneById(video.Uploader.Timezone), TimeZoneInfo.Local);
                item.End = TimeZoneInfo.ConvertTime(item.End, TimeZoneInfo.FindSystemTimeZoneById(video.Uploader.Timezone), TimeZoneInfo.Local);
            }
            return UploaderTimes;
        }

        public static List<VideoDTO> ConvertVideosToDTO(List<Video> videos)
        {
            return videos.Select(v => ConvertVideoToDTO(v)).ToList();
        }
        public static List<Video> ConvertDTOsToVideo(List<VideoDTO> videos)
        {
            return videos.Select(v => ConvertDTOToVideo(v)).ToList();
        }

    }
}
