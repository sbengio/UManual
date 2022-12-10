using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DAL
{
    public class UploaderDAL
    {
        public bool AddUploader(Uploader uploader)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                var l = uploader.Languages;
                uploader.Languages = new List<Language>();
                db.Uploaders.Add(uploader);
                try
                {
                    db.SaveChanges();
                    foreach (var item in l)
                    {
                        Language language1 = db.Languages.First(a => a.Id == item.Id);
                        uploader.Languages.Add(language1);
                    }
                    db.SaveChanges();

                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            return true;
        }
        
        public void UpdateUploader(Uploader uploader)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Uploader olduploader = db.Uploaders.FirstOrDefault(u => u.Id == uploader.Id);
                olduploader.Firstname = uploader.Firstname;
                olduploader.Surname = uploader.Surname;
                olduploader.Email = uploader.Email;
                olduploader.Phone = uploader.Phone;
                olduploader.Country = uploader.Country;
                olduploader.Password = uploader.Password;
                olduploader.Support = uploader.Support;
                olduploader.Earnings = uploader.Earnings;
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
        public void UpdateAverageRating(double avg,long uploaderid)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Uploader olduploader = db.Uploaders.FirstOrDefault(u => u.Id == uploaderid);
                olduploader.AverageRating = Math.Round(avg,2);
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
        public bool OfferSupport(long uploaderid)
        {
            return GetAllUploaders().Find(a => a.Id == uploaderid).Support;
        }

        public Uploader GetUploaderById(long uploaderid)
        {
            return GetAllUploaders().Find(a => a.Id == uploaderid);
        }

        public void UpdateEarning(long id)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Uploader olduploader = db.Uploaders.FirstOrDefault(u => u.Id == id);
                olduploader.Earnings =olduploader.Earnings + 0.5M;
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

        public void Removeuploader(long id)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Uploader uploader2 = db.Uploaders.First(u => u.Id==id);
                uploader2.Inactive=true;
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

        public void Resetpassword(string email, string password)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                Uploader uploader = db.Uploaders.FirstOrDefault(u => u.Email.Equals(email));
                uploader.Password = password;
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

        public void RemoveUploader(Uploader uploader)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Uploaders.Remove(uploader);
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
        public List<Uploader> GetAllUploaders()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Uploaders.Where(u=>u.Inactive==false)
                    .Include(u=>u.Languages)
                    .Include(u=>u.UploaderTimes)
                    .ToList();
            }
        }
    }
}
