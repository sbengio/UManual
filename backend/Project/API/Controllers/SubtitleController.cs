using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class SubtitleController : ApiController
    {
        SubtitleBLL subtitleBLL = new SubtitleBLL();
        [HttpGet]
        public string CreateSubtitles(string path, string id, string lang)
        {
            return subtitleBLL.download(path, id, lang);
        }
        [HttpGet]
        public void UpdateSubtitle(string sub, string id,string lang)
        {
            subtitleBLL.UpdateSubtitle(sub,id,lang);
        }
        [HttpGet]
        public string readtranscript(string path)
        {
           return subtitleBLL.readtranscript(path);
        }
    }
}
