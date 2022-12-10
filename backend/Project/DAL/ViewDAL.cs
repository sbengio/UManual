using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class ViewDAL
    {
        public bool AddView(View view)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Views.Add(view);
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

        public List<View> GetAllViews()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Views.Include(d => d.Video)
                        .ToList();
            }
        }

        public void removeViewsbyVideoId(long videoid)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                List<View> views = db.Views.Where(v => v.VideoId == videoid).ToList();
                db.Views.RemoveRange(views);
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

        public void removeViewsByVideos(List<Video> videos)
        {
            foreach (var item in videos)
            {
                removeViewsbyVideoId(item.VideoId);
            }
        }

        public List<View> GetViewsByUploader(int UploaderId)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return GetAllViews().Where(a => a.Video.UploaderId==UploaderId).ToList();
            }
        }
        
    }
}
