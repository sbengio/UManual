using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using BLL;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ViewController : ApiController
    {
        ViewBLL ViewBLL = new ViewBLL();
        [HttpPost]
        public void AddView(ViewDTO view)
        {
            ViewBLL.AddView(view);
        }
        [HttpGet]
        public List<ViewDTO> GetViews()
        {
            return ViewBLL.GetAllViews();
        }
        [HttpGet]
        public List<ViewDTO> GetViewsByUploader(int uploaderid)
        {
            return ViewBLL.GetViewsByUploader(uploaderid);
        }
        [HttpDelete]
        public void removeViewsbyVideoId(long videoid)
        {
            ViewBLL.removeViewsbyVideoId(videoid);
        }
        [HttpDelete]
        public void removeViewsByVideos(List<VideoDTO> videos)
        {
            ViewBLL.removeViewsByVideos(videos);
        }
    }
}
