using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Google.Cloud.Speech.V1;
using Google.Cloud.Storage.V1;
using System;
using System.IO;
using System.Net;
using static Google.Cloud.Speech.V1.RecognitionConfig.Types;
using Google.Apis.Auth.OAuth2;

namespace BLL
{
    public class SubtitleBLL
    {
        static Account account = new Account("dxjydzq3r", "657612291392372", "LLu0G8sKIbbl1-AXifU__fnhAhE");
        Cloudinary cloudinary = new Cloudinary(account);
        string name = "";string publicid = ""; string Lang = "";
        string subPath = @"C:\PROJECT\Layers\Project\API\Subtitles\";
        public string download(string Videopath, string publicId, string language)
        {
            var outputFile = "";
            try
            {
                outputFile = @"C:\PROJECT\Layers\Project\API\Videos\" + publicId + ".mp4";
                var mp3Name = outputFile.Substring(0, outputFile.IndexOf(".")) + ".mp3";
                if (!File.Exists(mp3Name))
                {
                    //download mp4 file in order to convert to mp3 file
                    using (var client = new WebClient())
                    {
                        client.DownloadFile(Videopath, outputFile);
                    }
                    var ffMpeg = new NReco.VideoConverter.FFMpegConverter();
                    //convert mp3 file
                    ffMpeg.ConvertMedia(outputFile, mp3Name, "mp3");
                }
                name = publicId + language.Split('-')[0];
                publicid = publicId; Lang = language;
                subPath += publicId + ".vtt";
                return UploadFile(mp3Name);
            }  
            catch(Exception e)
            {
                throw e;
            }
        }
        public string UploadFile(string localPath)
        {
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"D:\vocal-sight-343514-f70288ad50a1.json");
            string bucketName = "example78";
            string objectName = publicid+".mp3";
            try
            {
                var storage = StorageClient.Create(GoogleCredential.FromFile(@"D:\vocal-sight-343514-f70288ad50a1.json"));
                using (var fileStream = File.OpenRead(localPath))
                {
                    storage.UploadObject(bucketName, objectName, "audio/mpeg", fileStream);
                    Console.WriteLine($"Uploaded {objectName}.");
                };
                return speech(objectName, Lang);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        public string speech(string objectName, string lang)
        {
            System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"D:\vocal-sight-343514-f70288ad50a1.json");
            try
            {
                SpeechClient client = SpeechClient.Create();
                LongRunningRecognizeRequest request = new LongRunningRecognizeRequest
                {
                    Audio = RecognitionAudio.FromStorageUri("gs://example78/" + objectName),
                    Config = new RecognitionConfig
                    {
                        Encoding = AudioEncoding.EncodingUnspecified,
                        SampleRateHertz = 16000,
                        LanguageCode = lang,
                        EnableAutomaticPunctuation = true,
                        EnableSpokenPunctuation = true
                    }
                };
                Google.LongRunning.Operation<LongRunningRecognizeResponse, LongRunningRecognizeMetadata>
                response = client.LongRunningRecognize(request);
                Google.LongRunning.Operation<LongRunningRecognizeResponse, LongRunningRecognizeMetadata>
                completedresponse = response.PollUntilCompleted();
                LongRunningRecognizeResponse result = completedresponse.Result;
                Console.WriteLine(result);
                return writeToFile(result);
            }
            catch(Exception e)
            {
                throw e;
            }

        }
        public string writeToFile(LongRunningRecognizeResponse response)
        {
            using (StreamWriter writer = File.CreateText(subPath))
            {
                writer.WriteLine("WEBVTT");
                writer.WriteLine();
                var startTime= response.Results[0].ResultEndTime; 
                var start= new TimeSpan(0, 0, 0) + ".000";
                var count = 0;
                foreach (var result in response.Results)
                {
                    count++;
                    var transcript = "";
                    foreach (var word_info in result.Alternatives)
                    {
                        transcript = word_info.Transcript;
                    }
                    var endTime = result.ResultEndTime;
                    if(count==1)
                        start = new TimeSpan(0, 0, 0) + ".000";
                    else
                        start = new TimeSpan(0, 0, (int)startTime.Seconds) + "." + startTime.Nanos * 0.000001;
                    var end = new TimeSpan(0, 0, (int)endTime.Seconds) + "." + endTime.Nanos * 0.000001;
                    writer.WriteLine(count);
                    writer.WriteLine(start + " --> " + end);
                    writer.WriteLine(transcript);
                    writer.WriteLine();
                    startTime = result.ResultEndTime;
                }
            }
            return uploadSub();
        }
        public string uploadSub()
        {
            try
            {
                cloudinary.Api.Secure = true;
                var uploadParams = new RawUploadParams()
                {
                    File = new FileDescription(subPath),
                    PublicId = publicid + ".vtt",
                    Overwrite = true
                };
                var uploadResult = cloudinary.Upload(uploadParams);
            }
            catch(Exception e)
            {
                throw e;
            }
            StreamReader reader = new StreamReader(subPath);
            string responseText = reader.ReadToEnd();
            reader.Close();
            return responseText;
        }
        public void UpdateSubtitle(string subtitle, string publicId,string lang)
        {
            var l = lang.Split('-')[0];
            var a = subtitle.Replace("<br>", "\n");
            var Subpath= @"C:\PROJECT\Layers\Project\API\Subtitles\"+publicId+".vtt";
            using (StreamWriter writer = File.CreateText(Subpath))
            {
                writer.Write(a);
                writer.Close();
            }
            try{
                cloudinary.Api.Secure = true;
                var uploadParams = new RawUploadParams()
                {
                    File = new FileDescription(Subpath),
                    PublicId = publicId + ".vtt",
                    Overwrite = true
                };
                var uploadResult = cloudinary.Upload(uploadParams);
            }
            catch(Exception e){throw e;}
            new VideoBLL().TranscribeVideo(@"C:\PROJECT\Layers\Project\API\Subtitles\" + publicId + ".vtt", publicId);
        }
        public string readtranscript(string path)
        {
            try
            {
                string text = File.ReadAllText(path);
                return text;
            }
            catch(Exception e){ throw e;}
        }
    }
    }
