using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class UploaderConverter
    {
        public static Uploader ConvertDTOToUploader(UploaderDTO uploader)
        {
            var uploader1= new Uploader
            {
                Id = uploader.Id,
                Firstname = uploader.Firstname,
                Surname = uploader.Surname,
                Country = uploader.Country,
                Email = uploader.Email,
                Password = uploader.Password,
                Phone = uploader.Phone,
                Support = uploader.Support,
                Timezone=uploader.Timezone,
                Earnings=uploader.Earnings,
                AverageRating=uploader.AverageRating,
                Inactive=uploader.Inactive,
                UploaderTimes=uploader.UploaderTimes.Select(t=>UploaderTimeConverter.ConvertDTOToUploaderTime(t)).ToList()
            };
            if(uploader.Support)
                uploader1.Languages = uploader.Languages.Select(l => new Language { Id = l.Id }).ToList();
            return uploader1;
        }
        public static Language FindLanguage(LanguageDTO language)
        {
            List<Language> languages = new LanguageDAL().GetAllLanguages();
            Language language1 = languages.Find(a => a.LanguageName == language.LanguageName);
            return language1;
        }
        public static UploaderDTO ConvertUploaderToDTO(Uploader uploader)
        {
            return new UploaderDTO
            {
                Id = uploader.Id,
                Firstname = uploader.Firstname,
                Surname = uploader.Surname,
                Country = uploader.Country,
                Email = uploader.Email,
                Password = uploader.Password,
                Phone = uploader.Phone,
                Support = uploader.Support,
                Timezone = uploader.Timezone,
                Earnings = uploader.Earnings,
                AverageRating = uploader.AverageRating,
                Inactive=uploader.Inactive,
                Languages = LanguageConverter.ConvertLanguagesToDTO(uploader.Languages.ToList()),
                UploaderTimes=uploader.UploaderTimes.Select(t=>UploaderTimeConverter.ConvertUploaderTimeToDTO(t)).ToList()

            };
        }
        public static List<UploaderDTO> ConvertUploadersToDTO(List<Uploader> uploaders)
        {
            return uploaders.Select(v => ConvertUploaderToDTO(v)).ToList();
        }
    }
}
