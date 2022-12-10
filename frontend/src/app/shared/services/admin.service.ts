import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Admin } from "../models/admin.models";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class AdminService{

    constructor(public http:HttpClient){  }

    CheckIfAdmin(email:string,password:string):Observable<boolean>
    {
        return this.http.get<boolean>(environment.serverUrl+'admin/CheckIfAdmin?email='+email+'&password='+password);
    }
}