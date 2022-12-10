import { ChangeDetectorRef, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Uploader } from 'src/app/shared/models/uploader.model';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UploaderTime } from 'src/app/shared/models/uploadertime.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { UploaderTimeService } from 'src/app/shared/services/uploadertime.service';
import { Video } from 'src/app/shared/models/video.model';
import { VideoService } from 'src/app/shared/services/video.service';
import { Router } from '@angular/router';
import {isValidPhoneNumber,parsePhoneNumber} from 'libphonenumber-js'
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control!.dirty && control!.valid ;
  }
}
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  @ViewChild(MatSidenav)sidenav!:MatSidenav; @ViewChild("c") Checkbox!:MatCheckbox;
  uploaderUp!:Uploader; langnames:string[]=[]; countries:any;
  public uploader!:FormGroup; hide=true; countBlockedVideos:any; videosDelete:Video[]=[];
  stepperOrientation: Observable<StepperOrientation>; times:any[]=[]
  matcher=new MyErrorStateMatcher();showing=false;

  constructor(private _formBuilder: FormBuilder, private observer: BreakpointObserver,private uploaderService:UploaderService, 
  public http:HttpClient, private titleservice:Title,private uploadertimeservice:UploaderTimeService,
  private uploaderservice:UploaderService,private videoservice:VideoService,
  private cdr: ChangeDetectorRef,private route:Router) { 
  this.stepperOrientation = observer.observe('(min-width: 800px)')
  .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
}
  get uploaderDetails():FormArray{
  return this.uploader.get('uploaderDetails') as FormArray
  }
  blockedVideos(){
    this.route.navigate(['/blocked']);
  }
  ngOnInit(): void {
    this.titleservice.setTitle("My profile");
    this.http.get('../../../../assets/countries.json').subscribe(data=>this.countries=data)  
    this.uploaderUp=JSON.parse(localStorage.getItem('uploader')!);
    this.videoservice.BlockedVideos(this.uploaderUp.Id!).subscribe(res=>this.countBlockedVideos=res)
    console.log(localStorage.getItem('uploader'));
    this.uploader=this._formBuilder.group({
      uploaderDetails:this._formBuilder.array([
          this._formBuilder.group({
        Firstname: [this.uploaderUp.Firstname, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        Lastname: [this.uploaderUp.Surname, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        email :  [this.uploaderUp.Email,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
      }),
      this._formBuilder.group({
        Country: [this.uploaderUp.Country, Validators.required],
        TimeRanges: this._formBuilder.array([]),
        phone:[this.uploaderUp.Phone, Validators.required]
      })])
    }, { validators: this.possible})
    console.log(JSON.parse(localStorage.getItem('times')!));
    if(this.uploaderUp.UploaderTimes!=null && JSON.parse(localStorage.getItem('times')!).length==0){
    for (let index = 0; index < this.uploaderUp.UploaderTimes!.length; index++) {
      ((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).push(
         this._formBuilder.group({
          TimeStart: [new Date(this.uploaderUp.UploaderTimes![index].Start!), Validators.required],
          TimeEnd :  [new Date(this.uploaderUp.UploaderTimes![index].End!),Validators.required]
      }))
    }}
    else{
      let t=JSON.parse(localStorage.getItem('times')!)
      for (let index = 0; index < t!.length; index++) {
        ((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).push(
           this._formBuilder.group({
            TimeStart: [new Date(t[index][0]), Validators.required],
            TimeEnd :  [new Date(t[index][1]),Validators.required]
      }))}
    }
}
possible: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => { 
  if((<FormArray>control.get('uploaderDetails')).at(1).value.phone!=null){
    return isValidPhoneNumber((<FormArray>control.get('uploaderDetails')).at(1).value.phone
    ,(<FormArray>control.get('uploaderDetails')).at(1).value.Country) ? 
    null : { notvalid: true }}
  return null;
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
    if(this.TimeRanges().controls.length!=0){
      document.getElementById("text")!.style.opacity="1"
      document.getElementById("text2")!.style.opacity="1"
    }
    document.getElementById("add")!.style.opacity="1"
    document.getElementById("su")!.style.opacity="1"
  }
  this.uploaderUp.Support=!c;
}
Update(){
  this.showing=true;
  this.uploaderUp.Firstname=(<FormArray>this.uploader.get('uploaderDetails')).at(0).value.Firstname
  this.uploaderUp.Surname=(<FormArray>this.uploader.get('uploaderDetails')).at(0).value.Lastname
  this.uploaderUp.Email=(<FormArray>this.uploader.get('uploaderDetails')).at(0).value.email
  if(this.uploaderUp.Support){
  this.uploaderUp.Phone=parsePhoneNumber((<FormArray>this.uploader.get('uploaderDetails')).at(1).value.phone,(<FormArray>this.uploader.get('uploaderDetails')).at(1).value.Country).formatInternational();
  this.uploaderUp.Country=(<FormArray>this.uploader.get('uploaderDetails')).at(1).value.Country 
  this.uploaderUp.UploaderTimes=[];this.times=[];
  this.uploadertimeservice.removeUploaderTimeforUploader(this.uploaderUp.Id!).subscribe();
  for (let index = 0; index < this.TimeRanges().controls.length ; index++) {
    let uploadertime=new UploaderTime();
    uploadertime.UploaderId=this.uploaderUp.Id;
    uploadertime.Start=((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).at(index).value.TimeStart.toLocaleTimeString();
    uploadertime.End=((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).at(index).value.TimeEnd.toLocaleTimeString();
    this.times.push([((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).at(index).value.TimeStart,((this.uploader.get('uploaderDetails') as FormArray).at(1).get('TimeRanges') as FormArray).at(index).value.TimeEnd]);
    this.uploadertimeservice.addUploaderTime(uploadertime).subscribe();
  }}
  this.uploaderService.updateUploader(this.uploaderUp).subscribe(res=>{
    this.uploaderService.login(this.uploaderUp.Email!,this.uploaderUp.Password!).subscribe(res=>{
      console.log(res);      
      if(res!=null){
        localStorage.setItem('uploader',JSON.stringify(res));
      }
      this.showing=false;
      document.getElementById("updated")!.style.display="block";
      localStorage.setItem('times',JSON.stringify(this.times));
  });});
}

ngAfterViewInit(){
  this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
    if (res.matches) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  });  
  if(this.uploaderUp.Support==false)
    this.uploaderDetails.controls[1].disable()
  else{
    this.Checkbox.checked=true;
    document.getElementById("text")!.style.opacity="1"
    document.getElementById("text2")!.style.opacity="1"
    document.getElementById("add")!.style.opacity="1"
    document.getElementById("su")!.style.opacity="1"
  }
  this.cdr.detectChanges();
}
removeaccount(){
  this.showing=true;localStorage.setItem("removed","true");
  this.videoservice.removeVideosOfUploader(this.uploaderUp.Id!).subscribe(res=>{
    this.uploaderservice.removeUploader(this.uploaderUp.Id!).subscribe(()=>{
      this.showing=false;
      this.route.navigate(['/register'])
    });
  });    
}
}