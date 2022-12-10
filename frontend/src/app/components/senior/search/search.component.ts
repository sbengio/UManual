import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Device } from 'src/app/shared/models/device.model';
import { Devicebrand } from 'src/app/shared/models/devicebrand.model';
import { Devicetype } from 'src/app/shared/models/devicetype.model';
import { DeviceTypeService } from 'src/app/shared/services/devicetype.service';
import { DeviceBrandService } from 'src/app/shared/services/devicebrand.service';
import { DeviceService } from 'src/app/shared/services/device.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { Video } from 'src/app/shared/models/video.model';
import { Title } from '@angular/platform-browser';
import { VoiceRecognitionService } from 'src/app/shared/services/voice-recognition.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { SeniorService } from 'src/app/shared/services/senior.service';
import { Senior } from 'src/app/shared/models/senior.models';
import { View } from 'src/app/shared/models/view.model';
import { ViewService } from 'src/app/shared/services/view.service';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  datasource:MatTableDataSource<Video>=new MatTableDataSource<Video>(); 
  devicetypes:Devicetype[]=[]; deviceBrands:Devicebrand[]=[]; filteredOptions!: Observable<string[]>;
  options: string[]=[]; options2:string[]=[]; deviceModels:Device[]=[]; public videos:Video[]=[]; fewDevices:boolean=false;
  selectedDevice:Device=new Device(0,0); searchText:any; freestyle=false;invisible=false;
  displayedColumns:string[]=['Duration','Date','Language','rating','support','watch']; model=null;  model2=null;  model3=null;
  num:any; a!:string; senior:Senior=new Senior(); searched:any; public duration=""; selects:any; buttons:any
  public text="start voice search"; LargeFs=0; LargerFs=0; XLargeFs=0; ;largebox=0; searchForm:any;
  freestylesearch = new FormControl(); marginl=0;marginxl=0;marginxxl=0;show=false; undefine=false;
  @ViewChildren('op') items: any;private keyManager: ActiveDescendantKeyManager<any>;
  @ViewChildren('op1') items2: any; private keyManager2: ActiveDescendantKeyManager<any>;
  @ViewChildren('op3') items3: any; private keyManager3: ActiveDescendantKeyManager<any>;
  constructor(private deviceTypeService:DeviceTypeService,private devicebrandservice:DeviceBrandService,
    private deviceservice:DeviceService, private videoService:VideoService,
    public voicerecognitionservice:VoiceRecognitionService,private uploaderservice:UploaderService, 
    private searchService:SearchService, public dialog:MatDialog, private titleservice:Title, 
    private seniorservice:SeniorService, private viewservice:ViewService, private http:HttpClient,
    private route:Router,private translateservice:TranslateService,private observer:BreakpointObserver,
    private liveAnnouncer: LiveAnnouncer,public breakpointObserver: BreakpointObserver) { 
      this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
      this.keyManager2 = new ActiveDescendantKeyManager(this.items2).withWrap();
      this.keyManager3 = new ActiveDescendantKeyManager(this.items3).withWrap();
    }
    onKeydown(event:any) {
      if (event.keyCode == "Enter") {
        this.model = this.keyManager.activeItem.item.name;
      } else {
        this.keyManager.onKeydown(event);
      }
    }
    onKeydown2(event:any) {
      if (event.keyCode == "Enter") {
        this.model2 = this.keyManager2.activeItem.item.name;
      } else {
        this.keyManager2.onKeydown(event);
      }
    }
    onKeydown3(event:any) {
      if (event.keyCode == "Enter") {
        this.model3 = this.keyManager3.activeItem.item.name;
      } else {
        this.keyManager3.onKeydown(event);
      }
    }
  ngOnInit(): void {
    this.loadDeviceTypes();    
    this.searchForm=new FormGroup({
      'deviceType' : new FormControl(),
      'deviceBrand' : new FormControl(),
      'deviceModel' : new FormControl(),
    });
    this.searchForm.get("deviceType").valueChanges.subscribe((res:any) => {
      if(this.searchForm.get("deviceType").value!=null)
        this.selectType(this.searchForm.get("deviceType").value)
      });
    this.searchForm.get("deviceBrand").valueChanges.subscribe((res:any) => {
      if(this.searchForm.get("deviceBrand").value!=null)
        this.selectBrand(this.searchForm.get("deviceBrand").value)
    });
    this.searchForm.get("deviceModel").valueChanges.subscribe((res:any) => {
      if(this.searchForm.get("deviceModel").value!=null)
        this.selectModel(this.searchForm.get("deviceModel").value)
    });
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.invisible = true;
        } else {
          this.invisible = false;
        }
      });
    this.titleservice.setTitle("search");
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.a = res.ip;
      this.senior.IP_Address=this.a;
      localStorage.setItem('seniorid',this.a);       
      this.seniorservice.addSenior(this.senior).subscribe()
    });
    this.voicerecognitionservice.init()
    this.selects = document.querySelectorAll('select')
    this.buttons= document.querySelectorAll('btn1')
    this.deviceservice.getAllDevices().subscribe(res=>{
      for (let index = 0; index < res.length; index++) {
        this.options.push(res[index].DeviceBrand+" "+res[index].DeviceType+" "+res[index].Model)
    }})
    this.filteredOptions = this.freestylesearch.valueChanges.pipe(
      startWith(''),
      map((value:string) => this._filter(value)),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngAfterViewInit(){
    console.log(this.items);
    this.selects.forEach((input: any, index: number) => {
      input.addEventListener('keydown', (e: { key: any; }) => {
        const key = e.key;
        switch(key) {
            case "ArrowLeft":
              this.selects[index].tabIndex=-1;
                try { if(index-1<0){
                  this.selects[this.selects.length-1].focus();
                  this.selects[this.selects.length-1].tabIndex=0;
                }
                  else{
                  this.selects[index-1].focus();
                  this.selects[index-1].tabIndex=0;
                }} catch {}
                break;
            case "ArrowRight":
                this.selects[index].tabIndex=-1;
                try { if(index==this.selects.length-1){
                  this.selects[0].focus();
                  this.selects[0].tabIndex=0;
                }
                else {
                  this.selects[index + 1].focus();
                  this.selects[index + 1].tabIndex=0;
                }}
                catch { }
                break;
    }})})
    this.buttons.forEach((input: any, index: number) => {
      input.addEventListener('keydown', (e: { key: any; }) => {
        const key = e.key;
        switch(key) {
            case "ArrowLeft":
              this.buttons[index].tabIndex=-1;
                try { if(index<0){
                  this.buttons[this.buttons.length-1].focus();
                  this.buttons[this.buttons.length-1].tabIndex=0;
                }
                  else{
                  this.buttons[index-1].focus();
                  this.buttons[index-1].tabIndex=0;
                }} catch {}
                break;
            case "ArrowRight":
                this.buttons[index].tabIndex=-1;
                try { if(index==this.buttons.length-1){
                  this.buttons[0].focus();
                  this.buttons[0].tabIndex=0;
                }
                else {
                  this.buttons[index + 1].focus();
                  this.buttons[index + 1].tabIndex=0;
                }}
                catch { }
                break;
    }})})
  }
  freeStyleSearch(searchText:string){
    if(searchText!=""){
    this.searchService.FreeStyleSearchSenior(searchText.toLowerCase(),navigator.language.split('-')[0]).subscribe(
      (res:any)=>{this.searched=true;this.searchText=searchText.toLowerCase();this.freestyle=true; this.undefine=false;
      if(res!=null){
        if (res.length!=0){
        this.videos=res;
        this.num=this.videos.length;
        this.setDuration(this.videos)
        this.datasource.data= this.videos;
      }
      else {this.num="No";this.datasource.data=[];}}
      else {this.num="No";this.datasource.data=[];}
    })
    this.searchHistory(searchText);}
  }
  setDuration(videos:Video[]){
    for (let index = 0; index < videos.length; index++) {
      var dur=videos[index].Duration;
      var durmins = Math.floor(dur! / 60);
      var dursecs = Math.floor(dur! - durmins * 60);
      if(durmins < 10){ videos[index].durationStr = "0"+durmins+":"; }
      else{videos[index].durationStr = durmins+":"}
      if(dursecs < 10){ videos[index].durationStr += "0"+dursecs; }
      else{videos[index].durationStr! += dursecs;}
    }
  }
  searchHistory(searchText:string){
    if(localStorage.getItem('data') == null){localStorage.setItem('data','[]');}
    var history={date:new Date(Date.now()),search:searchText};
    var old_data=JSON.parse(localStorage.getItem('data')||'[]');
    old_data.push(history);
    localStorage.setItem('data',JSON.stringify(old_data));
  }
  selectType(deviceTypeId:number){  
   this.selectedDevice.DeviceTypeId=deviceTypeId;
   this.devicebrandservice.getAllDeviceBrandsByType(deviceTypeId).subscribe(res=>{this.deviceBrands=res})
  }
  selectBrand(deviceBrandId:number){
    this.selectedDevice.DeviceBrandId=deviceBrandId;
    this.deviceservice.getAllDevicesByDetails(this.selectedDevice.DeviceTypeId!,deviceBrandId).subscribe(
      res=>this.deviceModels=res)
  }
  selectModel(model:string){
    this.deviceservice.GetdeviceByDetails(model,this.selectedDevice.DeviceTypeId!,this.selectedDevice.DeviceBrandId!)
    .subscribe(res=>{
      this.selectedDevice=res
      this.videoService.getVideosByDevice(res.Id!,navigator.language.split('-')[0]).subscribe(res=>{
        this.searched=true;this.freestyle=false;this.undefine=false;
        if(res.length!=0){
        this.videos=res;
        this.num=this.videos.length;
        this.setDuration(this.videos)
        this.datasource.data= this.videos;
        }
        else {this.num="No";this.datasource.data=[];}
      }) 
    })
    this.searchForm.reset()
    if(localStorage.getItem('data') == null){
      localStorage.setItem('data','[]');
    }
    var history={
      date:new Date(Date.now()),
      search:this.selectedDevice.DeviceType+' '+this.selectedDevice.DeviceBrand+' '+this.selectedDevice.Model
    };
    var old_data=JSON.parse(localStorage.getItem('data')||'[]');
    old_data.push(history);
    localStorage.setItem('data',JSON.stringify(old_data));
    this.selectedDevice=new Device();
  }
  loadDeviceTypes(){
   this.deviceTypeService.getAllDeviceTypes().subscribe(res=>this.devicetypes=res)
  }
  record(){
    if(this.text=="start voice search")
    {
      this.text="stop voice search";
      this.startvoice();
    }
    else{
      this.text="start voice search";
      this.stopvoice();
    }
  }
  startvoice(){
    this.voicerecognitionservice.start();
  }  
  stopvoice(){
    this.voicerecognitionservice.stop();
    this.deviceservice.getAllDevices().subscribe(res=>{
      for (let index = 0; index < res.length; index++) {
        this.options2.push(res[index].DeviceBrand!)
        this.options2.push(res[index].DeviceType!);
        this.options2.push(res[index].Model!)
      }
      let s=this.voicerecognitionservice.text.toLowerCase().substring(0,this.voicerecognitionservice.text.length-1).split(' ')
      let f;
      for (let index = 0; index < s.length; index++) {
        f=this.options2.find(x=>x==s[index])
        if(f!=undefined)break;
      }    
      if(f!=undefined){
        this.freeStyleSearch(this.voicerecognitionservice.text.toLowerCase().substring(0,this.voicerecognitionservice.text.length-1));}
      else this.undefine=true
    })
    
  }
  save(vid:Video){
    var vhistory={
        date:new Date(Date.now()),
        video:vid.Url,
        title:vid.DeviceBrand+" "+vid.DeviceType+" "+vid.Model,
        subtitle:vid.SubUrl
    };
    var old_data=JSON.parse(localStorage.getItem('videodata')||'[]');
    old_data.push(vhistory);
    if(localStorage.getItem('videodata') == null){
      localStorage.setItem('videodata','[]');
    }
    localStorage.setItem('videodata',JSON.stringify(old_data));
    localStorage.setItem('video',vid.Url!);
    localStorage.setItem('lang',vid.LanguageCode!)
    localStorage.setItem('sub',vid.SubUrl!)
    localStorage.setItem('title',vid.DeviceBrand+" "+vid.DeviceType+" "+vid.Model)
    localStorage.setItem('phone',vid.Phone!)
    localStorage.setItem('videoid',vid.VideoId!.toString());
    localStorage.setItem('UpName',vid.UploaderName!); 
    localStorage.setItem('upTimes',JSON.stringify(vid.UploaderTimes));
    localStorage.setItem('languages',JSON.stringify(vid.Languages));
    localStorage.setItem('uploaderid',vid.UploaderId!.toString())!;
    this.show=true;
    var lang=navigator.language.split('-')[0];
    var id=(vid.SubUrl!.split("/")[6])+"\\"+(vid.SubUrl!.split("/")[7]).split(".")[0];
    var srclang=vid.LanguageCode!.split("-")[0];
    this.translateservice.TranslateTranscript("C:\\PROJECT\\Layers\\Project\\API\\Transcripts\\"+id+srclang+".txt",srclang,lang,id)
    .subscribe(res=>{
      localStorage.setItem('transcript',res);
      this.show=false;
      this.uploaderservice.OffersSupport(vid.UploaderId!).subscribe(res=>{
        localStorage.setItem('isSupport',String(res));
        let view=new View();
        view.VideoId=vid.VideoId;
        view.Date=new Date()
        this.viewservice.addView(view).subscribe(res=>{
          this.uploaderservice.UpdateEarning(vid.UploaderId!).subscribe(res=>{
            this.videoService.UpdateView(vid).subscribe(res=>{
            this.route.navigate(["/video"])
    });})})})});
  }
  enter(event:any,text:string){
    if(event.key == "Enter")
      this.freeStyleSearch(text);
  }
  sortby(sortbyvalue:any){
    //if no device id ? error
    if(sortbyvalue=="Views"){
      (document.getElementById("sortViews") as any)!.ariaSort="descending";
      (document.getElementById("sortDate") as any)!.ariaSort="none";
      (document.getElementById("sortRating") as any)!.ariaSort="none";
      this.videoService.GetVideosOrderedByViewsDesc(this.videos).subscribe(res=>{
        this.videos=res;
        this.num=this.videos.length;
        this.searched=true;
        this.setDuration(this.videos)
        this.datasource.data= this.videos;  
      })
    }
    else if(sortbyvalue=="Upload date"){
      (document.getElementById("sortDate") as any)!.ariaSort="descending";
      (document.getElementById("sortViews") as any)!.ariaSort="none";
      (document.getElementById("sortRating") as any)!.ariaSort="none";
      this.videoService.GetVideosOrderedByDate(this.videos).subscribe(res=>{
        this.videos=res;
        this.num=this.videos.length;
        this.searched=true;
        this.setDuration(this.videos)
        this.datasource.data= this.videos;
      })
    }
    else if(sortbyvalue=="Rating"){
      (document.getElementById("sortRating") as any)!.ariaSort="descending";
      (document.getElementById("sortViews") as any)!.ariaSort="none";
      (document.getElementById("sortDate") as any)!.ariaSort="none";
      this.videoService.GetVideosOrderedByRating(this.videos).subscribe(res=>{
        this.videos=res;
        this.num=this.videos.length;
        this.searched=true;
        this.setDuration(this.videos)
        this.datasource.data= this.videos;
      })
    }
    else if(sortbyvalue=="Duration"){
      (document.getElementById("sortDuration") as any)!.ariaSort="ascending";
      (document.getElementById("sortViews") as any)!.ariaSort="none";
      (document.getElementById("sortDate") as any)!.ariaSort="none";
      (document.getElementById("sortRating") as any)!.ariaSort="none";
      this.videoService.GetVideosOrderedByDuration(this.videos).subscribe(res=>{
        this.videos=res;
        this.num=this.videos.length;
        this.searched=true;
        this.setDuration(this.videos)
        this.datasource.data= this.videos;
      })
    }
  }
  large(){
    this.LargeFs=6; 
    this.LargerFs=0;
    this.XLargeFs=0;
    this.largebox=0;
    this.marginl=3;
    this.marginxl=0;
    this.marginxxl=0;
  }
  larger(){
    this.LargeFs=0; 
    this.LargerFs=10;
    this.XLargeFs=0;
    this.largebox=40;
    this.marginxl=6;
    this.marginl=0;
    this.marginxxl=0;
  }
  x_large(){
    this.LargeFs=0; 
    this.LargerFs=0;
    this.XLargeFs=14;
    this.largebox=46;
    this.marginxl=0;
    this.marginl=0;
    this.marginxxl=9;
  }
}
/* (change)="selectBrand(+deviceBrand.value)"
    (change)="selectModel(deviceModel.value)"
    (change)="selectType(+deviceType.value)" */
