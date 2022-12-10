using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class VideoBL
    {

        VideoDAL videoDAL = new VideoDAL();

        public bool AddVideo(VideoDTO videoDTO)
        {
            Video video = CONVERTERS.VideoConverter.ConvertVideoToDAL(videoDTO);
            return videoDAL.AddVideo(video);
        }

        public List<VideoDTO> GetAllVideos()
        {
            return CONVERTERS.VideoConverter.ConvertVideosToDTO(videoDAL.GetAllVideos());
             
        }
    }
}
