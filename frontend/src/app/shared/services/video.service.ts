import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Video } from "../models/video.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class VideoService{
    
    constructor(public http:HttpClient){  }
    getAllVideos():Observable<Video[]>
    {
        return this.http.get<Video[]>(environment.serverUrl+'video/GetVideos')
    }
    transcript(url:string,publicId:string,langID:number)
    {
        return this.http.get(environment.serverUrl+'video/TranscribeVideo?url='+url+"&publicId="+publicId+"&langId="+langID)
    }
    BlockedVideos(id:number):Observable<number>{
        return this.http.get<number>(environment.serverUrl+'video/NumberOfBlockedVideos?id='+id)
    }
    getBlockedVideos(id:number):Observable<Video[]>{
        return this.http.get<Video[]>(environment.serverUrl+'video/getBlockedVideos?id='+id)
    }
    ApproveVideo(video:Video){
        return this.http.put(environment.serverUrl+'video/ApproveVideo',video)
    }
    UpdateView(video:Video){
        return this.http.put(environment.serverUrl+'video/UpdateView',video)
    }
    GetVideosForApproval():Observable<Video[]>{
        return this.http.get<Video[]>(environment.serverUrl+'video/GetVideosForApproval')
    }
    getVideosByUploaderID(id:number):Observable<Video[]>{
        return this.http.get<Video[]>(environment.serverUrl+'video?uploaderID='+id)
    }
    getVideosByDevice(deviceId:number,lang:string):Observable<Video[]>{
        return this.http.get<Video[]>(environment.serverUrl+'video/GetVideosByDevice?deviceId='+deviceId+"&lang="+lang)
    }
    GetVideosOrderedByViewsDesc(videos:Video[]):Observable<Video[]>{
        return this.http.post<Video[]>(environment.serverUrl+'video/GetVideosOrderedByViewsDesc?videos=',videos)
    }
    GetVideosOrderedByDate(videos:Video[]):Observable<Video[]>{
        return this.http.post<Video[]>(environment.serverUrl+'video/GetVideosOrderedByDate?videos=',videos)
    }
    GetVideosOrderedByRating(videos:Video[]):Observable<Video[]>{
        return this.http.post<Video[]>(environment.serverUrl+'video/GetVideosOrderedByRating?videos=',videos)
    }
    GetVideosOrderedByDuration(videos:Video[]):Observable<Video[]>{
        return this.http.post<Video[]>(environment.serverUrl+'video/GetVideosOrderedByDuration?videos=',videos)
    }
    addVideo(video:Video){
        return this.http.post(environment.serverUrl+'video/AddVideo',video)
    }
    updateVideo(video:Video){
        return this.http.put(environment.serverUrl+'video/UpdateVideo',video)
    }
    removeVideo(id:number){
        return this.http.delete(environment.serverUrl+'video/RemoveVideo?videoId='+id)
    }
    removeVideosOfUploader(id:number){
        return this.http.delete(environment.serverUrl+'video/RemoveVideosOfUploader?id='+id)
    }
}
