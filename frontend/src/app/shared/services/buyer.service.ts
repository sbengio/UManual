import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Buyer } from '../models/buyer.model';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(public http:HttpClient) { }
  getAllBuyers():Observable<Buyer[]>{
    return this.http.get<Buyer[]>(environment.serverUrl+'buyer')
  }
  addBuyer(buyer:Buyer)
  {
    return this.http.post(environment.serverUrl+'buyer',buyer)
  }
  login(email:string,password:string):Observable<Buyer>{
    return this.http.get<Buyer>(environment.serverUrl+'buyer/Login?email='+email+"&password="+password)
  }
  exist(email:string,password:string):Observable<boolean>{
    return this.http.get<boolean>(environment.serverUrl+'buyer/Exist?email='+email+'&password='+password);
  } 
  resetpassword(email1:string,password1:string){
    let par=email1+" "+password1;
    return this.http.put(environment.serverUrl+'buyer/Resetpassword?par='+par,par)
  }
  buyerexists(email:string):Observable<boolean>{
    return this.http.get<boolean>(environment.serverUrl+'buyer/buyerexists?email='+email)
}
}
