using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using DTO;
using System.Threading.Tasks;

namespace BLL.CONVERTERS
{
    public class ViewConverter
    {
        public static View ConvertDTOToView(ViewDTO view)
        {
            return new View
            {
                ID = view.ID,
                Date = view.Date,
                VideoId = view.VideoId
            };
        }
        public static ViewDTO ConvertViewToDTO(View view)
        {
            return new ViewDTO
            {
                ID = view.ID,
                Date = view.Date,
                VideoId = view.VideoId,
                UploaderId = view.Video.UploaderId
            };
        }
        public static List<ViewDTO> ConvertViewsToDTO(List<View> views)
        {
            return views.Select(v => ConvertViewToDTO(v)).ToList();
        }
    }
}
