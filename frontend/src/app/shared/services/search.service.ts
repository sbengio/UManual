import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(public http:HttpClient){  }
  FreeStyleSearch(searchText:string):Observable<Video[]>{
    return this.http.get<Video[]>(environment.serverUrl+'search/FreeStyleSearch?searchText='+searchText)
  }
  FreeStyleSearchSenior(searchText:string,lang:string):Observable<Video[]>{
    return this.http.get<Video[]>(environment.serverUrl+'search/FreeStyleSearchSenior?searchText='+searchText+"&lang="+lang)
  }
  FreeSearchForUploader(searchText:string,uploaderID:number):Observable<Video[]>{
    return this.http.get<Video[]>(environment.serverUrl+'search?searchText='+searchText+'&uploaderID='+uploaderID)
  }
  BingSearch(searchText:string){
    return this.http.get("https://api.bing.microsoft.com/v7.0/search?q="+searchText,
    {headers:
      {'Ocp-Apim-Subscription-Key':"b54a3007b3ea4ea5b4c57da35064695a"}
    })
  }
}
