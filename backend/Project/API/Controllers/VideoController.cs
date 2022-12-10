using BLL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class VideoController : ApiController
    {
        VideoBLL videoBLL = new VideoBLL();
        [HttpGet]
        public List<VideoDTO> GetVideos()
        {
            return videoBLL.GetAllVideos();
        }
        [HttpGet]
        public void TranscribeVideo(string url, string publicId,long langId)
        {
            var code = new LanguageBLL().GetLanguages().Find(a => a.Id == langId).Code.Split('-')[0];
            var id= publicId.Split('.')[0];
            var name = id + code;
            videoBLL.TranscribeVideo(url,name);
        }
        [HttpGet]
        public int NumberOfBlockedVideos(long id)
        {
            return videoBLL.NumberOfBlockedVideos(id);
        }
        [HttpGet]
        public List<VideoDTO> getBlockedVideos(long id)
        {
            return videoBLL.getBlockedVideos(id);
        }
        [HttpGet]
        public List<VideoDTO> GetVideosForApproval()
        {
            return videoBLL.GetVideosForApproval();
        }
        [HttpPost]
        public List<VideoDTO> GetVideosOrderedByViewsDesc(List<VideoDTO> videos)
        {
            return videoBLL.GetVideosOrderedByViewsDesc(videos);
        }
        [HttpPost]
        public List<VideoDTO> GetVideosOrderedByDate(List<VideoDTO> videos)
        {
            return videoBLL.GetVideosOrderedByDate(videos);
        }
        [HttpPost]
        public List<VideoDTO> GetVideosOrderedByRating(List<VideoDTO> videos)
        {
            return videoBLL.GetVideosOrderedByRating(videos);
        }
        [HttpPost]
        public List<VideoDTO> GetVideosOrderedByDuration(List<VideoDTO> videos)
        {
            return videoBLL.GetVideosOrderedByDuration(videos);
        }
        [HttpGet]
        public List<VideoDTO> GetVideosByDevice(long deviceId)
        {
            return videoBLL.GetVideosByDevice(deviceId);
        }
        [HttpGet]
        public List<VideoDTO> GetVideosByUploaderID(long uploaderID)
        {
            return videoBLL.GetVideosByUploaderID(uploaderID);
        }
        [HttpPost]
        public void AddVideo(VideoDTO video)
        {
            videoBLL.AddVideo(video);
        }
        [HttpPut]
        public void UpdateVideo(VideoDTO video)
        {
            videoBLL.UpdateVideo(video);
        }
        [HttpPut]
        public void UpdateView(VideoDTO video)
        {
            videoBLL.UpdateView(video);
        }
        [HttpPut]
        public void ApproveVideo(VideoDTO video)
        {
            videoBLL.ApproveVideo(video);
        }
        [HttpDelete]
        public void RemoveVideo(long videoId)
        {
            videoBLL.RemoveVideo(videoId);
        }
        [HttpDelete]
        public void RemoveVideosOfUploader(long id)
        {
            videoBLL.RemoveVideosOfUploader(id);
        }
    }
}
