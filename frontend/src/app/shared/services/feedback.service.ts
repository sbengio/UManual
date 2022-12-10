import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Feedback } from "../models/feedback.model";
import { Observable } from "rxjs";
import { Video } from "../models/video.model";

@Injectable({
    providedIn:'root'
})

export class FeedbackService{

    constructor(public http:HttpClient){  }

    getAllFeedbacks():Observable<Feedback[]>{
        return this.http.get<Feedback[]>(environment.serverUrl+'feedback')
    }
    checkIfFeedback(ip:string,id:number):Observable<number>{
        return this.http.get<number>(environment.serverUrl+'feedback/CheckIfFeedback?ip='+ip+'&id='+id)
    }
    addFeedback(feedback:Feedback){
        return this.http.post(environment.serverUrl+'feedback',feedback)
    }
    removeForVideos(videos:Video[]){
        return this.http.delete(environment.serverUrl+'feedback/removeForVideos?videos=',{body:videos})
    }
}