import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Devicetype } from "../models/devicetype.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class DeviceTypeService{

    constructor(public http:HttpClient){  }
    getAllDeviceTypes():Observable<Devicetype[]>
    {
        return this.http.get<Devicetype[]>(environment.serverUrl+'devicetype')
    }
    GetDeviceTypesIdByType(type:string):Observable<number>{
        return this.http.get<number>(environment.serverUrl+'devicetype?type='+type);
    }
    addDeviceType(devicetype:Devicetype)
    {
        return this.http.post(environment.serverUrl+'devicetype',devicetype)
    }
}