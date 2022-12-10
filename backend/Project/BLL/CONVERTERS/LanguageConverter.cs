using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class LanguageConverter
    {
        public static Language ConvertDTOToLanguage(LanguageDTO language)
        {
            return new Language
            {
                Id = language.Id,
                LanguageName = language.LanguageName,
                Code = language.Code
            };

        }

        public static LanguageDTO ConvertLanguageToDTO(Language language)
        {
            return new LanguageDTO
            {
                Id = language.Id,
                LanguageName = language.LanguageName,
                Code=language.Code
            };
        }
        public static List<LanguageDTO> ConvertLanguagesToDTO(List<Language> languages)
        {
            return languages.Select(v => ConvertLanguageToDTO(v)).ToList();
        }
    }
}
