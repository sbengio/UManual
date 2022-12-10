using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class LanguageBLL
    {
        LanguageDAL languageDAL = new LanguageDAL();
        public bool AddLanguage(LanguageDTO languageDTO)
        {
            Language language = CONVERTERS.LanguageConverter.ConvertDTOToLanguage(languageDTO);
            return languageDAL.AddLanguage(language);
        }
        public List<LanguageDTO> GetLanguages()
        {
            List<Language> list = languageDAL.GetAllLanguages();
            return CONVERTERS.LanguageConverter.ConvertLanguagesToDTO(list);
        }
        public bool checkLang(string to)
        {
            List<Language> list = languageDAL.GetAllLanguages();
            if (list.Find(a => a.Code.Split('-')[0].Equals(to.Split('-')[0])) == null)
                return false;
            return true;
        }
       

    }
}
