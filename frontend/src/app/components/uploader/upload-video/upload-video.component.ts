import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Device } from 'src/app/shared/models/device.model';
import { Devicebrand } from 'src/app/shared/models/devicebrand.model';
import { Devicetype } from 'src/app/shared/models/devicetype.model';
import { Language } from 'src/app/shared/models/language.models';
import { Video } from 'src/app/shared/models/video.model';
import { DeviceService } from 'src/app/shared/services/device.service';
import { DeviceBrandService } from 'src/app/shared/services/devicebrand.service';
import { DeviceTypeService } from 'src/app/shared/services/devicetype.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { SubtitleService } from 'src/app/shared/services/subtitle.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

  constructor(private uploadservice: UploadService, private observer:BreakpointObserver,
    private titleservice:Title, private deviceBrandService:DeviceBrandService,
    private deviceTypeService:DeviceTypeService,private deviceservice:DeviceService,
    private languageservice:LanguageService, private videoservice:VideoService,
    private cdr: ChangeDetectorRef,private route:Router,private searchservice:SearchService,
    private subtitleservice:SubtitleService) { }
     
  div:any; uploadForm: any; uploadSubtitleForm:any; url:any; myFiles!: File; subtitleFile!:File;countBlockedVideos:any
  video:Video=new Video(); languages:Language[]=[]; deviceBrand:Devicebrand=new Devicebrand();showing=false;
  device:Device=new Device(); devicetype:Devicetype=new Devicetype();  won=false;var=''; noSubtitle=false;
  @ViewChild(MatSidenav) sidenav!:MatSidenav;videopublicid:any; updated=false;isFull=false;
  @ViewChild("video") vid!:ElementRef
  @ViewChild('videoPlayer') videoplayer!: ElementRef;    
    
  ngOnInit() {    
    this.titleservice.setTitle("Upload video");
    this.uploadForm = new FormGroup({
      'type' : new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      'model' : new FormControl(null,[Validators.required]),
      'brand' : new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      'language' : new FormControl(null,[Validators.required])
    });  
    this.uploadSubtitleForm = new FormGroup({
      'subtitle': new FormControl()
    }); 
    this.video.UploaderId=JSON.parse(localStorage.getItem('uploader')!).Id;
    this.video.Views=0;
    this.languageservice.getLanguages().subscribe(res=>this.languages=res);
    this.videoservice.BlockedVideos(this.video.UploaderId!).subscribe(res=>this.countBlockedVideos=res)
  }
  getFileDetails(e:any) {              
    this.myFiles=e.target.files[0];
    this.isFull=true;
    this.url = URL.createObjectURL(e.target.files[0]);
    this.vid.nativeElement.src=this.url
    this.vid.nativeElement.ondurationchange = ()=> {
      console.log(Math.floor(this.vid.nativeElement.duration/ 60)+":"+Math.floor(this.vid.nativeElement.duration - Math.floor(this.vid.nativeElement.duration/ 60) * 60));
      this.video.Duration=this.vid.nativeElement.duration
    };
  }   
  blockedVideos(){
    this.route.navigate(['/blocked']);
  }
  getFileDetailsSub(e:any) {               
    this.subtitleFile=e.target.files[0];   
  } 
  bingsearch(){
    let notPossible=false;
    let s=this.uploadForm.controls['brand'].value.toLowerCase()+" "+this.uploadForm.controls['type'].value.toLowerCase()+" "+this.uploadForm.controls['model'].value.toLowerCase();
    this.searchservice.BingSearch(s)
    .subscribe((res:any)=>{  
      for (let index = 0; index < res.webPages.value.length; index++) {
        let n=res.webPages.value[index].name.toLowerCase() 
        let words=s.split(' ');  let index2; 
        for (index2 = 0; index2 < words.length; index2++) {
          if(!n.includes(words[index2]))
              break;
        }
        if(index2==words.length){
          document.getElementById("noDevice")!.innerHTML="";
          notPossible=false;
          this.Upload();
          break;         
        }
        else notPossible=true;
      }
      if(notPossible)
        document.getElementById("noDevice")!.innerHTML="Please enter a valid device";
  });
  }
  Upload(){
    this.won=true;
    this.showing=true;
    var input:any=<HTMLInputElement>document.getElementById("sub")!;
      if(input.files.length!=0){
        this.uploadservice.uploadSubtitle(this.subtitleFile).subscribe((res:any)=>{
          this.video.SubUrl=environment.subUrl.replace('????',res.public_id);
          this.videoservice.transcript(this.video.SubUrl,res.public_id,this.uploadForm.controls['language'].value.Id)
          .subscribe(res=>{
            this.uploadservice.uploadVideo(this.myFiles).subscribe((res:any)=>{
              if(res){
              console.log(res);
              this.video.Url=environment.videoUrl.replace('????',res.public_id)
              this.upload(this.video)
        }});});});
      }
      else{
        this.noSubtitle=true
        this.uploadservice.uploadVideo(this.myFiles).subscribe((res:any)=>{
          if(res){
          this.video.Url=environment.videoUrl.replace('????',res.public_id)
          this.videopublicid=res.public_id;
          let langCode=this.uploadForm.controls['language'].value.Code
          this.subtitleservice.createSubtitle(this.video.Url,res.public_id,langCode).subscribe(res=>{
            this.uploadSubtitleForm.patchValue({'subtitle':res}) 
            this.video.SubUrl=environment.subUrl.replace('????',this.videopublicid+".vtt");
            this.upload(this.video)
          });}}); 
      }
  }
  upload(vid:Video){
    this.deviceBrand.Brand=this.uploadForm.controls['brand'].value.toLowerCase();
      this.deviceBrandService.addDeviceBrand(this.deviceBrand).subscribe(res=>{
      this.devicetype.Type=this.uploadForm.controls['type'].value.toLowerCase();
      this.deviceTypeService.addDeviceType(this.devicetype).subscribe(res=>{
        this.deviceBrandService.GetDeviceBrandIdByBrand(this.uploadForm.controls['brand'].value.toLowerCase()).subscribe(res=>{
        this.device.DeviceBrandId=res;
        this.deviceTypeService.GetDeviceTypesIdByType(this.uploadForm.controls['type'].value.toLowerCase()).subscribe(res=>{
          this.device.DeviceTypeId=res;
          this.device.Model=this.uploadForm.controls['model'].value.toLowerCase();
          console.log(this.device);
          this.deviceservice.addDevice(this.device).subscribe(res=>{
            this.deviceservice.GetdeviceByDetails(this.uploadForm.controls['model'].value.toLowerCase(),this.device.DeviceTypeId!,this.device.DeviceBrandId!).subscribe(res=>{
              this.video.DeviceId=res.Id;
              this.video.LanguageId=this.uploadForm.controls['language'].value.Id;
              this.video.Blocked=false;
              this.video.Approved=false;
              this.video.Price=5;
              this.video.Date=new Date();
              this.video.AverageRating=0;
              console.log(JSON.stringify(this.video)); 
              this.videoservice.addVideo(this.video).subscribe(()=>{
                if(!this.noSubtitle)
                  this.uploadForm.reset()
                  this.showing=false;
          });})});})});});});
  }
  uploadSubtitle(){
    this.showing=true;
    var sub=this.uploadSubtitleForm.controls['subtitle'].value
    let langCode=this.uploadForm.controls['language'].value.Code
    this.subtitleservice.UpdateSubtitle(sub.replace(/(?:\r\n|\r|\n)/g, '<br>'),this.videopublicid,langCode)
    .subscribe(res=>{
      this.updated=true;
      this.showing=false;
    })
  }  
  reset(){
    this.noSubtitle=false;
    this.uploadForm.reset()
    this.uploadSubtitleForm.reset()
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
    this.cdr.detectChanges();
  }

}
