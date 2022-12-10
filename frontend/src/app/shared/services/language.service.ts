import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { environment } from "src/environments/environment";
import { Language } from "../models/language.models";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class LanguageService{

    constructor(public http:HttpClient){  }

    getLanguages():Observable<Language[]>
    {
        return this.http.get<Language[]>(environment.serverUrl+'language')
    }
    addLanguages(languages:Language[])
    {
        return this.http.post(environment.serverUrl+'language/AddLanguages',languages)
    }
    addLanguage(language:Language)
    { 
        return this.http.post<Language>(environment.serverUrl+'language',language)
    }
}