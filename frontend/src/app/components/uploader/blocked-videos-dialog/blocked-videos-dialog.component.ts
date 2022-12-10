import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { links } from 'src/app/shared/models/links.model';
import { Video } from 'src/app/shared/models/video.model';
import { SubtitleService } from 'src/app/shared/services/subtitle.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { environment } from 'src/environments/environment';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Language } from 'src/app/shared/models/language.models';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-blocked-videos-dialog',
  templateUrl: './blocked-videos-dialog.component.html',
  styleUrls: ['./blocked-videos-dialog.component.css']
})
export class BlockedVideosDialogComponent implements OnInit {
  myFiles!:File;subtitleFile!:File;video:Video=new Video();isFull=false;languages:Language[]=[];
  @ViewChild("video") vid!:ElementRef;uploadSubtitleForm:any;noSubtitle=false;videopublicid:any;
  showing=false;won=false;uploadForm: any;langCode="";
  @Inject(MAT_DIALOG_DATA) public data: any
  constructor(public dialogRef: MatDialogRef<BlockedVideosDialogComponent>,
    private uploadservice: UploadService,private videoservice:VideoService, 
    private languageservice:LanguageService,private subtitleservice:SubtitleService) { }

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      'language' : new FormControl(null,[Validators.required])
    })
    this.uploadSubtitleForm = new FormGroup({
      'subtitle': new FormControl()
    }); 
    this.languageservice.getLanguages().subscribe(res=>this.languages=res);
  }
  getFileDetails(e:any) {               
    this.myFiles=e.target.files[0];
    this.isFull=true;
    let url = URL.createObjectURL(e.target.files[0]);
    this.vid.nativeElement.src=url
    this.vid.nativeElement.ondurationchange = ()=> {
      this.video.Duration=this.vid.nativeElement.duration
    };
  } 
  getFileDetailsSub(e:any) {                
      this.subtitleFile=e.target.files[0];
  }      
  uploadSubtitle(){
    var sub=this.uploadSubtitleForm.controls['subtitle'].value;
    this.showing=true;
    this.subtitleservice.UpdateSubtitle(sub.replace(/(?:\r\n|\r|\n)/g, '<br>'),this.videopublicid,this.langCode).subscribe(res=>{
      this.showing=false;
      this.dialogRef.close(this.video)
    })    
  }  
  Edit(){
    this.won=true;
    this.showing=true;
    var input:any=<HTMLInputElement>document.getElementById("sub")!;
    this.video.LanguageId=this.uploadForm.controls['language'].value.Id;
    if(input.files.length!=0){
      this.uploadservice.uploadSubtitle(this.subtitleFile).subscribe((res:any)=>{
        this.video.SubUrl=environment.subUrl.replace('????',res.public_id);
        this.videoservice.transcript(this.video.SubUrl,res.public_id,Number(localStorage.getItem("Id")))
        .subscribe(()=>{
          this.uploadservice.uploadVideo(this.myFiles).subscribe((res:any)=>{
          this.video.Url=environment.videoUrl.replace('????',res.public_id)
          this.showing=false;
          this.dialogRef.close(this.video)
    })})})}
    else{
      this.noSubtitle=true;
      this.uploadservice.uploadVideo(this.myFiles).subscribe((res:any)=>{
        if(res){
        this.video.Url=environment.videoUrl.replace('????',res.public_id)
        this.videopublicid=res.public_id;
        this.langCode=this.uploadForm.controls['language'].value.Code;
        this.subtitleservice.createSubtitle(this.video.Url,res.public_id,this.langCode!).subscribe(res=>{
            this.showing=false;
            this.uploadSubtitleForm.patchValue({'subtitle':res}) 
            this.video.SubUrl=environment.subUrl.replace('????',this.videopublicid+".vtt");  
    });}});}
    }
  close(){
    this.dialogRef.close()
  }
}
