using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class IncomeBLL
    {
        IncomeDAL incomeDAL = new IncomeDAL();
        public bool AddIncome(IncomeDTO incomeDTO)
        {
            SendEmail(incomeDTO);
            IncomeDTO incomeDTO1 = GetIncomes().Find(a => a.BuyerId==incomeDTO.BuyerId && a.VideoId==incomeDTO.VideoId);
            if (incomeDTO1 == null)
            {
                Income income = CONVERTERS.IncomeConverter.ConvertDTOToIncome(incomeDTO);
                return incomeDAL.AddIncome(income);
            }
            return false;
        }
        public void SendEmail(IncomeDTO incomeDTO)
        {
            try
            {
                string email = "umanualcompany@gmail.com";
                string password = "umanual123";
                var login = new NetworkCredential(email, password);
                var message = new MailMessage();
                var smtpclient = new SmtpClient("smtp.gmail.com", 587);
                message.From = new MailAddress(email);
                message.To.Add(new MailAddress(incomeDTO.Email));
                message.Subject = "Your purchase details of " + incomeDTO.DeviceType + " " + incomeDTO.DeviceBrand + " " + incomeDTO.Model;
                message.Body = "<b>Video link: </b>"+incomeDTO.Url+"<br/><b>Subtitle link: </b>"+incomeDTO.SubUrl;
                message.IsBodyHtml = true;
                smtpclient.EnableSsl = true;
                smtpclient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpclient.UseDefaultCredentials = false;
                smtpclient.Credentials = login;
                smtpclient.Send(message);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public List<IncomeDTO> GetIncomes()
        {
            return CONVERTERS.IncomeConverter.ConvertIncomesToDTO(incomeDAL.GetAllIncomes());
        }

        public List<IncomeDTO> GetAllIncomesBybuyerid(long id)
        {
            return GetIncomes().Where(a => a.BuyerId == id).ToList();
        }

        public List<VideoDTO> FreeStyleSearch(string text, long id)
        {
            List<VideoDTO> list = new SearchBL().FreeStyleSearch(text);
            if(list!=null)
                return FilterVideos(list, id);
            return null;
        }
        public List<VideoDTO> FilterVideos(List<VideoDTO> vids, long id)
        {
            List<IncomeDTO> bought = CONVERTERS.IncomeConverter.ConvertIncomesToDTO(incomeDAL.GetIncomesOfBuyer(id));
            List<VideoDTO> videos = new List<VideoDTO>();
            if (bought.Count == 0)
                return vids;
            foreach (var item in vids)
            {
                var cont = false;
                for (int i = 0; i < bought.Count && !cont; i++)
                {
                    if (item.VideoId == bought[i].VideoId)
                        cont=true;
                }
                if(!cont)
                    videos.Add(item);
            }
            return videos;
        }

        public List<VideoDTO> Search(long deviceId, long id)
        {
            List<VideoDTO> videos = new VideoBLL().GetVideosByDevice(deviceId);
            if(videos!=null)
                return FilterVideos(videos, id);
            return null;
        }
    }
}
