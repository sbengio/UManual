using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class ViewBLL
    {
        ViewDAL ViewDAL = new ViewDAL();
        public bool AddView(ViewDTO view)
        {
           return ViewDAL.AddView(CONVERTERS.ViewConverter.ConvertDTOToView(view));
        }
        public List<ViewDTO> GetAllViews()
        {
            return CONVERTERS.ViewConverter.ConvertViewsToDTO(ViewDAL.GetAllViews());
        }
        public List<ViewDTO> GetViewsByUploader(int UploaderId)
        {
            return CONVERTERS.ViewConverter.ConvertViewsToDTO(ViewDAL.GetViewsByUploader(UploaderId));
        }

        public void removeViewsbyVideoId(long videoid)
        {
            ViewDAL.removeViewsbyVideoId(videoid);
        }

        public void removeViewsByVideos(List<VideoDTO> videos)
        {
            ViewDAL.removeViewsByVideos(CONVERTERS.VideoConverter.ConvertDTOsToVideo(videos));
        }
    }
}
