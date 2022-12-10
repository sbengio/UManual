import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(public http:HttpClient) { }
  uploadVideo(file:File){
    const frmData = new FormData();      
    frmData.append("file", file); 
    frmData.append("upload_preset","angular_cloudinary")
    frmData.append("cloud_name","dxjydzq3r")
    //frmData.append("public_id","uyp8tkrrvnfjkzbyxute")
    return this.http.post("https://api.cloudinary.com/v1_1/dxjydzq3r/video/upload"
    ,frmData)
  }
  uploadSubtitle(file:File){
    const frmData = new FormData();      
    frmData.append("file", file); 
    frmData.append("upload_preset","angular_cloudinary")
    frmData.append("cloud_name","dxjydzq3r")
    //frmData.append("folder",)
    return this.http.post("https://api.cloudinary.com/v1_1/dxjydzq3r/raw/upload/"
    ,frmData)
  }
    

}
