using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UploaderTimesDAL
    {
        public bool AddUploaderTime(UploaderTime uploaderTime)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.UploaderTimes.Add(uploaderTime);
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
        public void UpdateUploaderTime(UploaderTime uploaderTime)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Entry(uploaderTime);
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

        public List<UploaderTime> GetUploaderTimesByUploader(long uploaderId)
        {
            return GetAllUploaderTimes().Where(a => a.UploaderId == uploaderId).ToList();
        }
        public void RemoveUploaderTime(UploaderTime uploaderTime)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.UploaderTimes.Remove(uploaderTime);
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
        public List<UploaderTime> GetAllUploaderTimes()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.UploaderTimes.ToList();
            }
        }

        public void removeUploaderTimeforUploader(long id)
        {
            List<UploaderTime> uploaderTimes = GetUploaderTimesByUploader(id);
            foreach (var item in uploaderTimes)
            {
                using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
                {
                    UploaderTime uploaderTime = db.UploaderTimes.FirstOrDefault(a => a.Id == item.Id);
                    db.UploaderTimes.Remove(uploaderTime);
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
    }
}
