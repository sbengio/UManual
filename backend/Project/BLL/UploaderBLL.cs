using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class UploaderBLL
    {
        UploaderDAL UploaderDAL = new UploaderDAL();

        public bool AddUploader(UploaderDTO uploaderDTO)
        {
            Uploader uploader = CONVERTERS.UploaderConverter.ConvertDTOToUploader(uploaderDTO);
            return UploaderDAL.AddUploader(uploader);
        }
        public UploaderDTO Login(string email,string password)
        {
            UploaderDTO uploader= GetAllUploaders().Find(a => a.Email.Equals(email) && a.Password.Equals(password));
            if (uploader == null)
                return null;
            return uploader;
        }

        public bool Exist(string email, string password)
        {
            var l = GetAllUploaders();
            UploaderDTO uploader = GetAllUploaders().Find(a => a.Email.Equals(email) && a.Password.Equals(password));
            if (uploader == null)
                return false;
            return true;
        }

        public long GetUploaderIdByEmail(string email)
        {
            UploaderDTO uploader = GetAllUploaders().Find(a => a.Email.Equals(email));
            return uploader.Id;
        }

        public List<LanguageDTO> GetLanguagesByUploader(long uploaderid)
        {
            return CONVERTERS.UploaderConverter.ConvertUploaderToDTO(UploaderDAL.GetUploaderById(uploaderid)).Languages;
        }

        public bool OfferSupport(long uploaderid)
        {
            return UploaderDAL.OfferSupport(uploaderid);
        }

        public bool Uploaderexists(string email)
        {
            if (GetAllUploaders().Find(u => u.Email.Equals(email)) == null)
                return false;
            return true;
        }

        public void UpdateUploader(UploaderDTO uploader)
        {
            UploaderDAL.UpdateUploader(CONVERTERS.UploaderConverter.ConvertDTOToUploader(uploader));
        }
        public void RemoveUploader(UploaderDTO uploader)
        {
            UploaderDAL.RemoveUploader(CONVERTERS.UploaderConverter.ConvertDTOToUploader(uploader));
        }

        public void UpdateEarning(long id)
        {
            UploaderDAL.UpdateEarning(id);
        }

        public void Resetpassword(string email, string password)
        {
            UploaderDAL.Resetpassword(email, password);
        }

        public void Removeuploader(long id)
        {
            UploaderDAL.Removeuploader(id);
        }

        public List<UploaderDTO> GetAllUploaders()
        {
            return CONVERTERS.UploaderConverter.ConvertUploadersToDTO(UploaderDAL.GetAllUploaders());

        }
    }
}
