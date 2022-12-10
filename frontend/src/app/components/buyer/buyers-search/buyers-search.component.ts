import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from 'src/app/shared/models/device.model';
import { Devicebrand } from 'src/app/shared/models/devicebrand.model';
import { Devicetype } from 'src/app/shared/models/devicetype.model';
import { DeviceTypeService } from 'src/app/shared/services/devicetype.service';
import { DeviceBrandService } from 'src/app/shared/services/devicebrand.service';
import { DeviceService } from 'src/app/shared/services/device.service';
import { Video } from 'src/app/shared/models/video.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { VoiceRecognitionService } from 'src/app/shared/services/voice-recognition.service';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { IncomeService } from 'src/app/shared/services/income.service';
import { Income } from 'src/app/shared/models/income.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-buyers-search',
  templateUrl: './buyers-search.component.html',
  styleUrls: ['./buyers-search.component.css']
})
export class BuyersSearchComponent implements OnInit {
  show!:boolean;options2:string[]=[];undefine=false;
  datasource:MatTableDataSource<Video>=new MatTableDataSource<Video>(); 
  devicetypes:Devicetype[]=[]; deviceBrands:Devicebrand[]=[];
  deviceModels:Device[]=[]; public videos:Video[]=[]; searched=false;
  displayedColumns:string[]=['Duration','Date','Views','Language','rating','watch','buy'];
  public text="start voice search";selectedDevice:Device=new Device(0,0);
  freestyle=false;searchText="";num:any; filteredOptions!: Observable<string[]>; options: string[]=[];
  buyerId=JSON.parse(localStorage.getItem('buyer')!).BuyerId;
  searchForm: any; freestylesearch = new FormControl(); 
  constructor(private deviceTypeService:DeviceTypeService,private devicebrandservice:DeviceBrandService,
    private deviceservice:DeviceService, public voicerecognitionservice:VoiceRecognitionService,
    public dialog:MatDialog, private titleservice:Title, private incomeservice:IncomeService) { }

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
    this.titleservice.setTitle("Buyers search");
    this.voicerecognitionservice.init();
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
  enter(event:any,text:string){
    if(event.key == "Enter")
      this.freeStyleSearch(text);
  }
  watch(element:Video){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(VideoDialogComponent,dialogConfig);
  }
  buy(element:Video){
    this.show=true;
    let income=new Income()
    income.BuyerId=this.buyerId; income.VideoId=element.VideoId; income.Date=new Date();
    income.AverageRating=element.AverageRating; income.Url=element.Url; income.SubUrl=element.SubUrl; 
    income.DeviceBrand=element.DeviceBrand; income.DeviceType=element.DeviceType;income.Email=JSON.parse(localStorage.getItem('buyer')!).Email;
    income.Model=element.Model; income.SubUrl=element.SubUrl; income.Views=element.Views; 
    this.incomeservice.addIncome(income).subscribe(res=>{
      this.show=false;
      if((document.getElementById("searchInput")as HTMLInputElement).value==null && this.voicerecognitionservice.text==""){
        this.selectModel(this.selectedDevice.Model!);
      }
      else if(this.voicerecognitionservice.text!=""){
        this.freeStyleSearch(this.voicerecognitionservice.text);
      }
      else{
        this.freeStyleSearch(this.searchText);
    }});
  }
  freeStyleSearch(searchText:string){
    if(searchText!=""){
    this.incomeservice.FreeStyleSearch(searchText.toLowerCase(),this.buyerId).subscribe(
      (res:any)=>{
        this.searchText=searchText.toLowerCase();this.searched=true; this.freestyle=true;
        if(res!=null){
        if(res.length!=0){
        this.searched=true; this.videos=res; this.searchText=searchText.toLowerCase();
        this.num=this.videos.length; this.setDuration(this.videos); this.datasource.data= this.videos;
        document.getElementById('no')!.style.display='block';
        }
        else {this.num="No";this.datasource.data=[];}}
        else {this.num="No";this.datasource.data=[];}
    })}
  }
  record(){
    if(this.text=="start voice search"){
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
      this.selectedDevice=res;this.searched=true;this.freestyle=false;
      this.incomeservice.Search(res.Id!,this.buyerId).subscribe(res=>{
        if(res.length!=0){ 
        this.videos=res;
        document.getElementById('no')!.style.display='block';
        this.num=this.videos.length;
        this.setDuration(this.videos)
        this.datasource.data= this.videos;
        }
        else {this.num="No";this.datasource.data=[];}
        })     
      })
     this.searchForm.reset()
   }
   loadDeviceTypes(){
    this.deviceTypeService.getAllDeviceTypes().subscribe(res=>this.devicetypes=res)
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

}
