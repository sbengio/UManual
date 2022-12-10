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
    public class UploaderTimeController : ApiController
    {
        UploaderTimeBLL uploaderTimeBLL = new UploaderTimeBLL();
        
        [HttpGet]
        public List<UploaderTimeDTO> GetUploaderTimes()
        {
            return uploaderTimeBLL.GetUploaderTimes();
        }
        [HttpGet]
        public List<UploaderTimeDTO> GetUploaderTimesByUploader(long id)
        {
            return uploaderTimeBLL.GetUploaderTimesByUploader(id);
        }
        [HttpGet]
        public bool IsSupport(long UploaderId)
        {
            return uploaderTimeBLL.IsSupport(DateTime.Now, UploaderId);
        }

        [HttpPost]
        // POST: api/UploaderTime
        public void AddUploaderTime([FromBody] UploaderTimeDTO uploaderTimeDTO)
        {
            uploaderTimeBLL.AddUploaderTime(uploaderTimeDTO);
        }
        [HttpPut]
        public void UpdateUploaderTime(UploaderTimeDTO uploaderTime)
        {
            uploaderTimeBLL.UpdateUploaderTime(uploaderTime);
        }
        [HttpDelete]
        public void removeUploaderTimeforUploader(long id)
        {
            uploaderTimeBLL.removeUploaderTimeforUploader(id);
        }
        


    }
}
