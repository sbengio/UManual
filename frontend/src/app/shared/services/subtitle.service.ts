import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {

  constructor(public http:HttpClient){  }

    createSubtitle(path:string,id:string,lang:string):Observable<string>
    {
      return this.http.get<string>(environment.serverUrl+'subtitle/CreateSubtitles?path='+path+"&id="+id+"&lang="+lang);
    }
    UpdateSubtitle(sub:string,id:string,lang:string)
    {
      return this.http.get(environment.serverUrl+'subtitle/UpdateSubtitle?sub='+sub+"&id="+id+"&lang="+lang);
    }
    readtranscript(path:string):Observable<string>
    {
      return this.http.get<string>(environment.serverUrl+'subtitle/readtranscript?path='+path);
    }
}
