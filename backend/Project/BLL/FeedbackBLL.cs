using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class FeedbackBLL
    {
        FeedbackDAL FeedbackDAL = new FeedbackDAL();
        public bool AddFeedback(FeedbackDTO feedbackDTO)
        {
            Feedback feedback = CONVERTERS.FeedbackConverter.ConvertDTOToFeedback(feedbackDTO);
            return FeedbackDAL.AddFeedback(feedback);
        }
        public List<FeedbackDTO> GetFeedbackOfVideo(long videoID)
        {
            return CONVERTERS.FeedbackConverter.ConvertFeedbacksToDTO(FeedbackDAL.GetFeedbackOfVideo(videoID));
        }
        public List<FeedbackDTO> GetFeedbacks()
        {
            return CONVERTERS.FeedbackConverter.ConvertFeedbacksToDTO(FeedbackDAL.GetAllFeedbacks());
        }
        public double CheckIfFeedback(string ip, long id)
        {
            return FeedbackDAL.CheckIfFeedback(ip,id);
        }

        public void removeForVideos(List<VideoDTO> videos)
        {
            FeedbackDAL.removeForVideos(CONVERTERS.VideoConverter.ConvertDTOsToVideo(videos));
        }
    }
}
