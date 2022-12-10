using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class VideoDAL
    {
        public bool AddVideo(Video video)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Videos.Add(video);
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            return true;
        }
        public void UpdateVideo(Video video)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Video oldVideo = db.Videos.FirstOrDefault(v => v.VideoId == video.VideoId);
                oldVideo.Price = video.Price;
                oldVideo.Views = video.Views;
                oldVideo.UploaderId = video.UploaderId;
                oldVideo.DeviceId = video.DeviceId;
                oldVideo.LanguageId = video.LanguageId;
                oldVideo.Blocked = video.Blocked;
                oldVideo.Url = video.Url;
                oldVideo.Approved = video.Approved;
                oldVideo.Date = video.Date;
                oldVideo.Duration = oldVideo.Duration;
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
        public void UpdateRating(double avg,long videoId)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Video oldVideo = db.Videos.FirstOrDefault(v => v.VideoId == videoId);
                oldVideo.AverageRating = Math.Round(avg,2);
                try
                {
                    db.SaveChanges();
                    List<Video> vids = GetVideosByUploaderID(oldVideo.UploaderId);
                    int vidcount = vids.Count; double sumRating = 0;
                    foreach (var item in vids)
                    {
                        sumRating += item.AverageRating;
                    }
                    new UploaderDAL().UpdateAverageRating((double)sumRating / (double)vidcount, oldVideo.UploaderId);  
                }
                catch (Exception e)
                {
                    throw e;
                }
            }                      
        }
        public List<Video> GetVideosForApproval()
        {
            return GetAllVideos().Where(a => a.Approved == false).ToList();
        }
        public void removeVideosOfUploader(long id)
        {
            List<Video> videos = GetAllVideos().Where(a => a.UploaderId == id).ToList();
            foreach (var item in videos)
            {
                using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
                {
                    Video video = db.Videos.FirstOrDefault(a => a.VideoId == item.VideoId);
                    video.Disabled = true;
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
        public void UpdateView(Video video)
        {
            Video oldVideo;
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                oldVideo = db.Videos.FirstOrDefault(v => v.VideoId == video.VideoId);
                oldVideo.Views++;
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            long sum = new FeedbackDAL().SumPaused(video.VideoId);
            double per = 0.1 * oldVideo.Views;
            if (sum >= per && video.Blocked == false)
                BlockVideo(video);
        }
        public void BlockVideo(Video video)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Video oldVideo = db.Videos.FirstOrDefault(v => v.VideoId == video.VideoId);
                oldVideo.Blocked = true;
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
        public void ApproveVideo(Video video)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Video oldVideo = db.Videos.FirstOrDefault(v => v.VideoId == video.VideoId);
                oldVideo.Approved = true;
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
        public List<Video> GetVideosByDevice(long deviceId)
        {
            return GetAllVideos().Where(v => v.DeviceId == deviceId && v.Approved && !v.Blocked && !v.Disabled).ToList();
        }
        public List<Video> GetVideosByUploaderID(long uploaderID)
        {
            return GetAllVideos().Where(v => v.UploaderId == uploaderID && !v.Disabled).ToList();
        }
        public void RemoveVideo(long videoId)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Video video =db.Videos.First(v => v.VideoId == videoId);
                video.Disabled = true;
                try
                {
                    db.SaveChanges();
                }
                catch(Exception e)
                {
                    throw e;
                }
            }
        }
        public List<Video> GetAllVideos()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Videos
                    .Include(V=>V.Uploader)
                    .Include(V => V.Uploader.Languages)
                    .Include(V => V.Uploader.UploaderTimes)
                    .Include(V=>V.Language)
                    .Include(V=>V.Device)
                    .Include(V=>V.Device.DeviceType)
                    .Include(V=>V.Device.DeviceBrand)
                    .OrderBy(V=>V.Date)
                    .ToList();
            }
        }
    }
}
