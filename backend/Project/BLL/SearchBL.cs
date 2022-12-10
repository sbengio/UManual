using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
   public class SearchBL
    {
        public List<VideoDTO> FreeSearchForUploader(string searchText,long uploaderID)
        {
            List<VideoDTO> searchResult = FreeStyleSearch(searchText);
            if (searchResult != null)
            {
                //filter videos by uploader id 
                searchResult = searchResult.Where(v => v.UploaderId == uploaderID).ToList();
                return searchResult;
            }
            else return null;
        }
        public List<VideoDTO> FreeStyleSearch(string searchText)
        {
            if (searchText == null)
                return null;
            var optionalModels = new DeviceBLL().GetDevicesByFreeStyleSearchText(searchText);
            if (optionalModels != null)
            {
                //convert devices to dto in order to send as parameter to GetVideosByDevices()
                var Devices = CONVERTERS.DeviceConverter.ConvertDevicesToDTO(
                    optionalModels.ToList());
                List<VideoDTO> Videos = new VideoBLL().GetVideosByDevices(Devices);
                return Videos;
            }
            else
            {
                return null;
            }
        }
        public List<VideoDTO> FreeStyleSearchSenior(string searchText, string lang)
        {
            var searchResult = FreeStyleSearch(searchText);
            if (searchResult == null)
                return null;
            else {
                List<VideoDTO> videos = searchResult;
                //empty searchResult
                searchResult = new List<VideoDTO>();
                //define new list = videos in different language than language of users computer
                List<VideoDTO> otherLangs = new List<VideoDTO>();
                foreach (var item in videos)
                {
                    if (item.LanguageCode.Split('-')[0] == lang)
                        //add to list video in same language
                        searchResult.Add(item);
                    else
                        //add to list video in different language
                        otherLangs.Add(item);
                }
                //add otherLangs to the end of searchResult
                searchResult.AddRange(otherLangs);
                return searchResult;
            }
        }
    }
}
