using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class FeedbackConverter
    {
        public static Feedback ConvertDTOToFeedback(FeedbackDTO feedback)
        {
            return new Feedback
            {
                Id = feedback.Id,
                IP_Address = feedback.IP_Address,
                VideoId = feedback.VideoId,
                BackCount = feedback.BackCount,
                Finish = feedback.Finish,
                MinutesStopped = feedback.MinutesStopped,
                PauseCount = feedback.PauseCount,
                Stars = feedback.Stars
            };
        }
        public static FeedbackDTO ConvertFeedbackToDTO(Feedback feedback)
        {
            return new FeedbackDTO
            {
                Id = feedback.Id,
                IP_Address = feedback.IP_Address,
                VideoId = feedback.VideoId,
                BackCount = feedback.BackCount,
                Finish = feedback.Finish,
                MinutesStopped = feedback.MinutesStopped,
                PauseCount = feedback.PauseCount,
                Stars = feedback.Stars
            };
        }
        public static List<FeedbackDTO> ConvertFeedbacksToDTO(List<Feedback> feedbacks)
        {
            return feedbacks.Select(v => ConvertFeedbackToDTO(v)).ToList();
        }
    }
}
