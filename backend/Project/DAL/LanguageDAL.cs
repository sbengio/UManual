using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class LanguageDAL
    {
        public bool AddLanguage(Language language)
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                db.Languages.Add(language);
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

        public List<Language> GetAllLanguages()
        {
            using (DeviceVideosDBEntities1 db = new DeviceVideosDBEntities1())
            {
                return db.Languages.ToList();
            }
        }
    }
}
