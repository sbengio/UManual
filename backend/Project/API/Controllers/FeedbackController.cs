using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BLL;
using DTO;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class FeedbackController : ApiController
    {
        FeedbackBLL FeedbackBLL = new FeedbackBLL();
        [HttpPost]
        public void AddFeedback(FeedbackDTO feedback)
        {
            FeedbackBLL.AddFeedback(feedback);
        }
        [HttpGet]
        public List<FeedbackDTO> GetFeedbackOfVideo(long videoID)
        {
            return FeedbackBLL.GetFeedbackOfVideo(videoID);
        }
        [HttpGet]
        public double CheckIfFeedback(string ip,long id)
        {
            return FeedbackBLL.CheckIfFeedback(ip,id);
        }
        [HttpDelete]
        public void removeForVideos(List<VideoDTO> videos)
        {
             FeedbackBLL.removeForVideos(videos);
        }
    }

}
