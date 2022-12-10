import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Devicebrand } from "../models/devicebrand.model";
import { Devicetype } from "../models/devicetype.model";
import { __param } from "tslib";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class DeviceBrandService{

    constructor(public http:HttpClient){  }

    getAllDeviceBrands():Observable<Devicebrand[]>
    {
        return this.http.get<Devicebrand[]>(environment.serverUrl+'devicebrand')
    }
    GetDeviceBrandIdByBrand(devicebrand:string):Observable<number>{
        return this.http.get<number>(environment.serverUrl+'devicebrand/GetDeviceBrandIdByBrand?brand='+devicebrand);
    }
    addDeviceBrand(devicebrand:Devicebrand)
    {
        return this.http.post(environment.serverUrl+'devicebrand',devicebrand)
    }
    getAllDeviceBrandsByType(devicetypeid:number):Observable<Devicebrand[]>
    {
        return this.http.get<Devicebrand[]>(environment.serverUrl+'devicebrand?deviceTypeId='+devicetypeid)
    }
}