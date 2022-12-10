import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Uploader } from "../models/uploader.model";
import { UploaderTimeService } from "./uploadertime.service";
import { Observable } from "rxjs";
import { Language } from "../models/language.models";

@Injectable({
    providedIn:'root'
})

export class UploaderService{

    constructor(public http:HttpClient){  }

    resetpassword(email1:string,password1:string)
    {
        let par=email1+" "+password1;
        return this.http.put(environment.serverUrl+'uploader/Resetpassword?par='+par,par)
    }
    getAllUploaders():Observable<Uploader[]>
    {
        return this.http.get<Uploader[]>(environment.serverUrl+'uploader')
    }
    login(email:string,password:string):Observable<Uploader>{
        return this.http.get<Uploader>(environment.serverUrl+'uploader/Login?email='+email+'&password='+password);
    }
    exist(email:string,password:string):Observable<boolean>{
        return this.http.get<boolean>(environment.serverUrl+'uploader/Exist?email='+email+'&password='+password);
    }
    GetUploaderIdByEmail(email:string):Observable<number>{
        return this.http.get<number>(environment.serverUrl+'uploader/GetUploaderIdByEmail?email='+email);
    }
    GetLanguagesByUploader( uploaderid:number):Observable<Language[]>{
        return this.http.get<Language[]>(environment.serverUrl+'uploader/GetLanguagesByUploader?uploaderid='+uploaderid);
    }
    addUploader(uploader:Uploader){
        return this.http.post(environment.serverUrl+'uploader',uploader)
    }
    updateUploader(uploader:Uploader){
        return this.http.put(environment.serverUrl+'uploader',uploader)
    }
    UpdateEarning(id:number){
        return this.http.put(environment.serverUrl+'uploader/UpdateEarning?id='+id,id)
    }
    removeUploader(uploaderid:number){
        return this.http.delete(environment.serverUrl+'uploader/Removeuploader?id='+uploaderid)
    }
    OffersSupport(uploaderid:number):Observable<boolean>{
        return this.http.get<boolean>(environment.serverUrl+'uploader/OfferSupport?uploaderid='+uploaderid);
    }
    uploaderexists(email:string):Observable<boolean>{
        return this.http.get<boolean>(environment.serverUrl+'uploader/Uploaderexists?email='+email)
    }
}