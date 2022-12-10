import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Senior } from "../models/senior.models";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class SeniorService{

    constructor(public http:HttpClient){  }

    getAllSeniors():Observable<Senior[]>
    {
        return this.http.get<Senior[]>(environment.serverUrl+'senior')
    }

    addSenior(senior:Senior){
        return this.http.post<Senior>(environment.serverUrl+'senior',senior)
    }
}