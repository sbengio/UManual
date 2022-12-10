using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using BLL;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class TranslateController : ApiController
    {
        TranslateBLL TranslateBLL = new TranslateBLL();
        [HttpGet]
        public Task<string> TranslateTranscript(string path,string src,string to,string id)
        {
            var lang = to;
            if (to.Equals("he"))
                to = "iw";
            if (!src.Equals(to) && !TranslateBLL.exists(id, lang))
            {
                if (new LanguageBLL().checkLang(to))
                {
                    return TranslateBLL.TranslateTranscript(path, src, to, id);
                }
                else
                {
                    if(!src.Equals("en"))
                        return TranslateBLL.TranslateTranscript(path, src, "en", id);
                    return Task.FromResult(id +"en.txt");
                }
            }
            else return Task.FromResult(id + to + ".txt");
        }
    }
}
