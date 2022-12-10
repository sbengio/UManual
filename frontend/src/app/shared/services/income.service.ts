import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Income } from '../models/income.model';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(public http:HttpClient) { }
  getAllIncomes():Observable<Income[]>{
    return this.http.get<Income[]>(environment.serverUrl+'income')
  }
  getAllIncomesBybuyerid(id:number):Observable<Income[]>{
    return this.http.get<Income[]>(environment.serverUrl+'income/GetAllIncomesBybuyerid?id='+id)
  }
  addIncome(income:Income)
  {
      return this.http.post(environment.serverUrl+'income',income)
  }
  FreeStyleSearch(text:string,id:number):Observable<Video[]>{
    return this.http.get<Video[]>(environment.serverUrl+'income/FreeStyleSearch?text='+text+"&id="+id);
  }
  Search(deviceid:number,id:number):Observable<Video[]>{
    return this.http.get<Video[]>(environment.serverUrl+'income/Search?deviceId='+deviceid+"&id="+id);
  }
}
