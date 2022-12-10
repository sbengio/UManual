using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Newtonsoft.Json;

namespace BLL
{
    public class TranslateBLL
    {
        static Account account = new Account("dxjydzq3r", "657612291392372", "LLu0G8sKIbbl1-AXifU__fnhAhE");
        Cloudinary cloudinary = new Cloudinary(account);
        private static readonly string subscriptionKey = "5d4fb414e822440b84660102d5da7b9b";
        private static readonly string endpoint = "https://api.cognitive.microsofttranslator.com/";
        string name = "";
        string id = "";
        string to = "";
        public async Task<string> TranslateTranscript(string path, string src, string Lang, string id)
        {   
            try
            {
                StreamReader reader = new StreamReader(path);
                string responseText = reader.ReadToEnd();
                reader.Close();
                if (src.Equals("iw"))
                    src = "he";
                if (Lang.Equals("iw"))
                    Lang = "he";
                this.id = id;
                to = Lang;
                name = id + Lang;
                string route = "/translate?api-version=3.0&from=" + src + "&to=" + Lang;
                object[] body = new object[] { new { Text = responseText } };
                var requestBody = JsonConvert.SerializeObject(body);
                using (var client = new HttpClient())
                using (var request = new HttpRequestMessage())
                {
                    request.Method = System.Net.Http.HttpMethod.Post;
                    request.RequestUri = new Uri(endpoint + route);
                    request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                    request.Headers.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
                    HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                    string result = await response.Content.ReadAsStringAsync();
                    return UploadTranscript(result);
                }
            }
            catch (Exception e) { throw e; }
        } 
        public string UploadTranscript(string result)
        {
            var t = JsonConvert.DeserializeObject<List<Dictionary<string, List<Dictionary<string, string>>>>>(result);
            var a = t[0]["translations"][0]["text"];
            var Subpath = "C:\\PROJECT\\Layers\\Project\\API\\Transcripts\\" + name + ".txt";
            using (StreamWriter writer = File.CreateText(Subpath))
            {
                writer.Write(a);
                writer.Close();
            }
            cloudinary.Api.Secure = true;
            try
            {
                var uploadParams = new RawUploadParams()
                {
                    File = new FileDescription(Subpath),
                    PublicId = "project/" + name.Split('\\')[1] + ".txt",
                    Overwrite = true
                };
                var uploadResult = cloudinary.Upload(uploadParams);
            }
            catch(Exception e) { throw e; }
            return id + to + ".txt";
        }
        public bool exists(string id,string to)
        {
            var p = "C:\\PROJECT\\Layers\\Project\\API\\Transcripts\\"+id+to+".txt";
            return File.Exists(p);
        }
    }
}
