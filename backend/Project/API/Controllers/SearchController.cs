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
    [EnableCors("*","*","*")]
    public class SearchController : ApiController
    {
        [HttpGet]
        public List<VideoDTO> FreeStyleSearch(string searchText)
        {
            return new SearchBL().FreeStyleSearch(searchText);
        }
        [HttpGet]
        public List<VideoDTO> FreeStyleSearchSenior(string searchText,string lang)
        {
            return new SearchBL().FreeStyleSearchSenior(searchText,lang);
        }
        [HttpGet]
        public List<VideoDTO> FreeSearchForUploader(string searchText, long uploaderID)
        {
            return new SearchBL().FreeSearchForUploader(searchText,uploaderID);
        }
    }
}
