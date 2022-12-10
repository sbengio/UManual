import { Component, ElementRef, OnInit } from '@angular/core';
import { Uploader } from 'src/app/shared/models/uploader.model';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import {AbstractControl, Form, FormArray,FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStep, MatStepper, StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Language } from 'src/app/shared/models/language.models';
import { UploaderTime } from 'src/app/shared/models/uploadertime.model';
import { UploaderTimeService } from 'src/app/shared/services/uploadertime.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import {isValidPhoneNumber, parsePhoneNumber} from 'libphonenumber-js'
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return invalidCtrl || invalidParent;
  }
}
export class MyErrorStateMatcher2 implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control!.dirty && control!.valid ;
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  stepperOrientation: Observable<StepperOrientation>;
  langs:any=[]; prob:any; langnames:Language[]=[]; public uploader!:FormGroup; matcher=new MyErrorStateMatcher();
  newUploader!:Uploader;  selectedLanguages:Language[]=[];  languages:Language[]=[]; countries:any;
  language:Language=new Language();  hide=true; phone!:any; matcher2=new MyErrorStateMatcher2()

  constructor(private _formBuilder: FormBuilder,breakpointObserver: BreakpointObserver,private uploaderService:UploaderService,
    public http:HttpClient, private titleservice:Title, private languageService:LanguageService,
    private uploadertimeservice:UploaderTimeService,private route:Router) { 
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
    .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
  }
  get uploaderDetails():FormArray{
  return this.uploader.get('uploaderDetails') as FormArray
  }
  ngOnInit(): void {
    this.titleservice.setTitle("Register");
    if(localStorage.getItem("removed")=="true"){
      localStorage.setItem("removed","");
      document.getElementById("removed")!.style.display="block";
    }
    this.http.get('../../../../assets/countries.json').subscribe(data=>this.countries=data)  
    this.languageService.getLanguages().subscribe(res=>{
      this.languages=res;
      console.log(this.languages);
    }); 
    this.uploader=this._formBuilder.group({
      uploaderDetails:this._formBuilder.array([
          this._formBuilder.group({
        Firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        Lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        email :  ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        Password:['', [Validators.required,Validators.minLength(7)]],
        ConfirmPassword:['', Validators.required]
      }),
      this._formBuilder.group({
        Lang: ['', Validators.required],
        Country: ['', Validators.required],
        TimeRanges: this._formBuilder.array([this.createItem()]),
        phone:['', Validators.required]
      })])
    }, { validators: [this.checkPasswords,this.possible]})
    this.uploaderDetails.controls[1].disable()
    this.newUploader=new Uploader();
  }
  checkPasswords: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => { 
    let pass = (<FormArray>control.get('uploaderDetails')).at(0).value.Password;
    let confirmPass = (<FormArray>control.get('uploaderDetails')).at(0).value.ConfirmPassword
    return pass === confirmPass ? null : { notSame: true }
  }
  possible: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => {
      return isValidPhoneNumber((<FormArray>control.get('uploaderDetails')).at(1).value.phone
      ,(<FormArray>control.get('uploaderDetails')).at(1).value.Country) ? 
      null : { notValid: true }
  } 
  createItem(){
      return this._formBuilder.group({
    TimeStart: ['', Validators.required],
    TimeEnd :  ['',Validators.required]
    })
  }
  addTimeRange(){
    ((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).push(this.createItem())
  }
  TimeRanges() {
    return (this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray
  }
  disablediv(c:boolean){
    if(c==true){
      this.uploaderDetails.controls[1].disable()}
    else{
      this.uploaderDetails.controls[1].enable()
      document.getElementById("text")!.style.opacity="1"
      document.getElementById("text2")!.style.opacity="1"
      document.getElementById("add")!.style.opacity="1"
      document.getElementById("su")!.style.opacity="1"
    }
    this.newUploader.Support=!c;
  }
  Register(){
    this.uploaderService.uploaderexists((<FormArray>this.uploader.get('uploaderDetails')).at(0).value.email).
    subscribe(res=>{if(!res){
      this.newUploader.Firstname=(<FormArray>this.uploader.get('uploaderDetails')).at(0).value.Firstname
      this.newUploader.Surname=(<FormArray>this.uploader.get('uploaderDetails')).at(0).value.Lastname
      this.newUploader.Email=(<FormArray>this.uploader.get('uploaderDetails')).at(0).value.email
      this.newUploader.Password=(<FormArray>this.uploader.get('uploaderDetails')).at(0).value.Password
      if(this.newUploader.Support){
      this.phone=parsePhoneNumber((<FormArray>this.uploader.get('uploaderDetails')).at(1).value.phone,(<FormArray>this.uploader.get('uploaderDetails')).at(1).value.Country).formatInternational();
      this.newUploader.Phone=this.phone.formatInternational()
      this.newUploader.Country=(<FormArray>this.uploader.get('uploaderDetails')).at(1).value.Country
      this.newUploader.Languages=(<FormArray>this.uploader.get('uploaderDetails')).at(1).value.Lang
      }
      this.uploaderService.addUploader(this.newUploader).subscribe(res=>{
        if(this.newUploader.Support){
        this.uploaderService.GetUploaderIdByEmail(this.newUploader.Email!).subscribe(res=>{
          this.newUploader.Id=res;
          this.newUploader.UploaderTimes=[];
          for (let index = 0; index < this.TimeRanges().controls.length ; index++) {
            let uploadertime=new UploaderTime();
            uploadertime.UploaderId=this.newUploader.Id;
            uploadertime.Start=((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).at(index).value.TimeStart.toLocaleTimeString();
            uploadertime.End=((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).at(index).value.TimeEnd.toLocaleTimeString();
            this.uploadertimeservice.addUploaderTime(uploadertime).subscribe();
      }})}});
      this.route.navigate(['/login']);
    }
    else  document.getElementById('exists')!.style.display="block";
  })}
  
  //}
  /* this.http.get('../../../../assets/langs.json').subscribe(
    data=>{
      this.langs=data as string[];
      for (let i = 0; i < this.langs.length; i++) {
        this.langnames.push(new Language(undefined,this.langs[i].name,this.langs[i].code));
     }
     this.languageService.addLanguages(this.langnames).subscribe(); 
  }) */
}
 
 