import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Device } from "../models/device.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class DeviceService{

    constructor(public http:HttpClient){  }

    getAllDevices():Observable<Device[]>
    {
        return this.http.get<Device[]>(environment.serverUrl+'device')
    }
    addDevice(device:Device)
    {
        return this.http.post(environment.serverUrl+'device',device)
    }
    getAllDevicesByDetails(devicetypeid:number,deviceBrandId:number):Observable<Device[]>
    {
        return this.http.get<Device[]>(environment.serverUrl+'device/GetDevicesByDetails?devicetypeid='+devicetypeid+'&deviceBrandId='+deviceBrandId)
    }
    GetdeviceByDetails(model:string,devicetypeid:number,deviceBrandId:number):Observable<Device>{
        return this.http.get<Device>(environment.serverUrl+'device?model='+model+'&devicetypeid='+devicetypeid+'&devicebrandid='+deviceBrandId);
    }
    
}