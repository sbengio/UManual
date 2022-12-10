using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class FeedbackDAL
    {
        public bool AddFeedback(Feedback feedback)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                if (GetAllFeedbacks().Find(a => a.IP_Address == feedback.IP_Address && a.VideoId == feedback.VideoId) == null)
                {
                    db.Feedbacks.Add(feedback);
                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
                else { UpdateFeedback(feedback); }
                int feedbackCount = GetFeedbackOfVideo(feedback.VideoId).Count;
                int feedbackSum = 0;
                foreach (Feedback item in GetFeedbackOfVideo(feedback.VideoId))
                {
                    feedbackSum += item.Stars;
                }
                new VideoDAL().UpdateRating((double)feedbackSum / (double)feedbackCount, feedback.VideoId);
            }
            return true;
        }

        public void removeForVideos(List<Video> videos)
        {
            foreach (var item in videos)
            {
                using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
                {
                    List<Feedback> feedbacks = db.Feedbacks.Where(v => v.VideoId == item.VideoId).ToList();
                    db.Feedbacks.RemoveRange(feedbacks);
                    try
                    {
                        db.SaveChanges();
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }
        }

        public List<Feedback> GetAllFeedbacks()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Feedbacks
                    .ToList();
            }
        }
        public void UpdateFeedback(Feedback feedback)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Feedback oldfeedback = db.Feedbacks.FirstOrDefault(a => a.IP_Address == feedback.IP_Address && a.VideoId == feedback.VideoId);
                oldfeedback.MinutesStopped = feedback.MinutesStopped;
                oldfeedback.Stars = feedback.Stars;
                oldfeedback.PauseCount = feedback.PauseCount;
                oldfeedback.BackCount = feedback.BackCount;
                oldfeedback.Finish = feedback.Finish;
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }
        public double CheckIfFeedback(string ip, long id)
        {
            Feedback feedback = GetAllFeedbacks().FirstOrDefault(a => a.IP_Address.Equals(ip) && a.VideoId==id);
            if (feedback != null)
                return feedback.MinutesStopped;
            return 0;
        }
        public List<Feedback> GetFeedbackOfVideo(long videoID)
        {
            return GetAllFeedbacks().Where(v => v.VideoId == videoID).ToList();
        }
        public long SumPaused(long videoID)
        {
            long sum = 0;
            List<Feedback> paused= GetFeedbackOfVideo(videoID).Where(a => a.PauseCount >= 1).ToList();
            foreach (var item in paused)
            {
                sum += item.PauseCount;
            }
            List<Feedback> back = GetFeedbackOfVideo(videoID).Where(a => a.BackCount >= 1).ToList();
            foreach (var item in back)
            {
                sum += item.BackCount;
            }
            return sum;
        }
    }
}
