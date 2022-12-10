import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(public http:HttpClient){  }

    TranslateTranscript(path:string,src:string,to:string,id:string):Observable<string>{
      return this.http.get<string>(environment.serverUrl+'translate/TranslateTranscript?path='+path+"&src="+src+"&to="+to+"&id="+id);
    }
}
