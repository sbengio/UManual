import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { UploaderTime } from "../models/uploadertime.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class UploaderTimeService{

    constructor(public http:HttpClient){  }

    getAllUploaderTimes():Observable<UploaderTime[]>
    {
        return this.http.get<UploaderTime[]>(environment.serverUrl+'uploadertime')
    }
    GetUploaderTimesByUploader(id:number):Observable<UploaderTime[]>
    {
        return this.http.get<UploaderTime[]>(environment.serverUrl+'uploadertime/GetUploaderTimesByUploader?id='+id)
    }
    IsSupport(UploaderId:number):Observable<boolean>
    {
        return this.http.get<boolean>(environment.serverUrl+'uploadertime/IsSupport?UploaderId='+UploaderId);
    }
    addUploaderTime(uploadertime:UploaderTime)
    {
        return this.http.post(environment.serverUrl+'uploadertime',uploadertime)
    }

    updateUploaderTime(uploadertime:UploaderTime){
        return this.http.put(environment.serverUrl+'uploadertime',uploadertime)
    }
    removeUploaderTimeforUploader(id:number){
        return this.http.delete(environment.serverUrl+'uploadertime/removeUploaderTimeforUploader?id='+id)
    }
}