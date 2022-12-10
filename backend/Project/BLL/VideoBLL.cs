using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BLL
{
    public class VideoBLL
    {
        VideoDAL videoDAL = new VideoDAL();
        static Account account = new Account("dxjydzq3r", "657612291392372", "LLu0G8sKIbbl1-AXifU__fnhAhE");
        Cloudinary cloudinary = new Cloudinary(account);
        public bool AddVideo(VideoDTO videoDTO)
        {
            DAL.Video video = CONVERTERS.VideoConverter.ConvertDTOToVideo(videoDTO);
            return videoDAL.AddVideo(video);
        }
        public void TranscribeVideo(string path, string publicId)
        {
            try
            {
                StreamReader reader = new StreamReader(path);
                string responseText = reader.ReadToEnd();
                string[] lines = responseText.Split('\n');
                var patht = @"C:\PROJECT\Layers\Project\API\Transcripts\" + publicId + ".txt";
                using (StreamWriter writer = File.CreateText(patht))
                {
                    var count = 0;
                    var writecount = 0;
                    foreach (string line in lines)
                    {
                        if (count >= 1)
                        {
                            string strRegex = @"^.*([a-zA-Z\u05D0-\u05EA]).*$";
                            Regex myRegex = new Regex(strRegex, RegexOptions.Multiline);
                            foreach (Match myMatch in myRegex.Matches(line))
                            {
                                if (myMatch.Success)
                                {
                                    writer.Write(line);
                                    writecount++;
                                    if (writecount % 3 == 0)
                                        writer.WriteLine();
                                }
                            }
                        }
                        count++;
                    };
                }
                uploadTranscript(patht, publicId);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public void uploadTranscript(string path, string name)
        {
            try
            {
                cloudinary.Api.Secure = true;
                var uploadParams = new RawUploadParams()
                {
                    File = new FileDescription(path),
                    PublicId = name + ".txt",
                    Overwrite = true
                };
                var uploadResult = cloudinary.Upload(uploadParams);
            }
            catch(Exception e){throw e;}
        }
        public void UpdateVideo(VideoDTO video)
        {
            videoDAL.UpdateVideo(CONVERTERS.VideoConverter.ConvertDTOToVideo(video));
        }
        public void RemoveVideo(long videoId)
        {
            videoDAL.RemoveVideo(videoId);
        }
        public int NumberOfBlockedVideos(long id)
        {
            return GetAllVideos().Where(a => a.UploaderId == id && a.Blocked).ToList().Count;
        }
        public List<VideoDTO> getBlockedVideos(long id)
        {
            return GetAllVideos().Where(a => a.UploaderId == id&&a.Blocked).ToList();
        }
        public List<VideoDTO> GetVideosForApproval()
        {
            return CONVERTERS.VideoConverter.ConvertVideosToDTO(videoDAL.GetVideosForApproval());
        }
        public List<VideoDTO> GetVideosOrderedByViewsDesc(List<VideoDTO> videos)
        {
            return videos.OrderByDescending(x => x.Views).ToList();
        }
        public List<VideoDTO> GetVideosOrderedByDate(List<VideoDTO> videos)
        {
            return videos.OrderByDescending(x => x.Date).ToList();
        }
        public List<VideoDTO> GetVideosOrderedByRating(List<VideoDTO> videos)
        {
            return videos.OrderByDescending(x => x.AverageRating).ToList();
        }
        public List<VideoDTO> GetVideosOrderedByDuration(List<VideoDTO> videos)
        {
            return videos.OrderBy(x => x.Duration).ToList();
        }
        public List<VideoDTO> GetVideosByDevices(List<DeviceDTO> devices)
        {
            List<VideoDTO> videos=new List<VideoDTO>();
            //go through each device and return video/s of each device
            foreach (var item in devices)
            {
                videos.AddRange(GetVideosByDevice(item.Id));
            }
            return videos;
        }
        public List<VideoDTO> GetVideosByDevice(long deviceId)
        {
            return CONVERTERS.VideoConverter.ConvertVideosToDTO(videoDAL.GetVideosByDevice(deviceId));
        }
        public List<VideoDTO> GetVideosByUploaderID(long uploaderID)
        {
            List<VideoDTO> videos =CONVERTERS.VideoConverter.ConvertVideosToDTO(videoDAL.GetVideosByUploaderID(uploaderID));
            return videos;
        }
        public List<VideoDTO> GetAllVideos()
        {
            return CONVERTERS.VideoConverter.ConvertVideosToDTO(videoDAL.GetAllVideos());
             
        }
        public void UpdateView(VideoDTO video)
        {
            videoDAL.UpdateView(CONVERTERS.VideoConverter.ConvertDTOToVideo(video));
        }
        public void ApproveVideo(VideoDTO video)
        {
            videoDAL.ApproveVideo(CONVERTERS.VideoConverter.ConvertDTOToVideo(video));
        }
        public void RemoveVideosOfUploader(long id)
        {
            videoDAL.removeVideosOfUploader(id);
        }
    }
}
