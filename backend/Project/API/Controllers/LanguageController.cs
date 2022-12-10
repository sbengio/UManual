using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using BLL;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class LanguageController : ApiController
    {
        LanguageBLL languageBLL = new LanguageBLL();
        [HttpPost]
        public void AddLanguage(LanguageDTO language)
        {
            languageBLL.AddLanguage(language);
        }
        [HttpPost]
        public void AddLanguages(LanguageDTO[] languages)
        {
            for (int i = 0; i < languages.Length; i++)
            {
                if (GetLanguages().Find(l => l.LanguageName == languages[i].LanguageName) == null)
                {
                    LanguageDTO languageDTO = new LanguageDTO();
                    languageDTO.LanguageName = languages[i].LanguageName;
                    languageDTO.Code= languages[i].Code;
                    languageBLL.AddLanguage(languageDTO);
                }
            }
        }
        [HttpGet]
        public List<LanguageDTO> GetLanguages()
        {
            List<LanguageDTO> list= languageBLL.GetLanguages();
            return languageBLL.GetLanguages();
        }


    }
}
