import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from '../models/video.model';
import { View } from '../models/view.model';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(public http:HttpClient) { }
  
  getViews():Observable<View[]>
  {
      return this.http.get<View[]>(environment.serverUrl+'view')
  }
  getViewsByUploader(uploaderid:number):Observable<View[]>
  {
      return this.http.get<View[]>(environment.serverUrl+'view/GetViewsByUploader?uploaderid='+uploaderid)
  }
  addView(view:View)
  {
      return this.http.post(environment.serverUrl+'view',view)
  }
  removeViewsByVideoId(videoid:number){
    return this.http.delete(environment.serverUrl+"view/removeViewsbyVideoId?videoid="+videoid)
  }
  removeViewsByVideos(videos:Video[]){
    return this.http.delete(environment.serverUrl+"view/removeViewsByVideos?videos=",{body:videos})
  }
}
