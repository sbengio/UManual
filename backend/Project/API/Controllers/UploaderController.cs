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
    public class UploaderController : ApiController
    {
        UploaderBLL uploaderBLL = new UploaderBLL();
        [HttpGet]
        public List<UploaderDTO> GetUploaders()
        {
            return uploaderBLL.GetAllUploaders();
        }
        [HttpGet]
        public UploaderDTO Login(string email,string password)
        {
            return uploaderBLL.Login(email, password);
        }
        [HttpGet]
        public bool Exist(string email, string password)
        {
            return uploaderBLL.Exist(email, password);
        }
        [HttpGet]
        public long GetUploaderIdByEmail(string email)
        {
            return uploaderBLL.GetUploaderIdByEmail(email);
        }
        [HttpGet]
        public List<LanguageDTO> GetLanguagesByUploader(long uploaderid)
        {
            return uploaderBLL.GetLanguagesByUploader(uploaderid);
        }
        [HttpGet]
        public bool OfferSupport(long uploaderid)
        {
            return uploaderBLL.OfferSupport(uploaderid);
        }
        [HttpGet]
        public bool Uploaderexists(string email)
        {
            return uploaderBLL.Uploaderexists(email);
        }
        [HttpPost]
        // POST: api/Uploader
        public void AddUploader([FromBody] UploaderDTO uploader)
        {
           uploader.AverageRating = 0;
           uploader.Timezone = TimeZoneInfo.Local.Id;
           uploaderBLL.AddUploader(uploader);
        }
        [HttpPut]
        public void UpdateUploader(UploaderDTO uploader)
        {
            uploaderBLL.UpdateUploader(uploader);
        }
        [HttpPut]
        public void UpdateEarning(long id)
        {
            uploaderBLL.UpdateEarning(id);
        }
        [HttpPut]
        public void Resetpassword(string par)
        {
            string email = par.Split(' ')[0];
            string password = par.Split(' ')[1];
            uploaderBLL.Resetpassword(email, password);
        }
        [HttpDelete]
        public void Removeuploader(long id)
        {
            uploaderBLL.Removeuploader(id);
        }
    }
}
