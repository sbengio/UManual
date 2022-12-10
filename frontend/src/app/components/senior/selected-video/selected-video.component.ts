import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Feedback } from 'src/app/shared/models/feedback.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { UploaderTimeService } from 'src/app/shared/services/uploadertime.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HostListener } from '@angular/core';
import { Language } from 'src/app/shared/models/language.models';
import { UploaderTime } from 'src/app/shared/models/uploadertime.model';
import { VideoService } from 'src/app/shared/services/video.service';
import { SubtitleService } from 'src/app/shared/services/subtitle.service';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-selected-video',
  templateUrl: './selected-video.component.html',
  styleUrls: ['./selected-video.component.css']
})
export class SelectedVideoComponent implements OnInit {
  constructor(private titleservice:Title,private feedbackservice:FeedbackService,
  private uploadertimesservice:UploaderTimeService,private sanitizer:DomSanitizer,
  private videoservice:VideoService,private subtitleservice:SubtitleService,private router:Router,public breakpointObserver: BreakpointObserver) { }
  
  @ViewChild("videoPlayer", { static: true }) videoplayer!: ElementRef;
  @ViewChild("seekslider", { static: true }) seekslider!: ElementRef;
  @ViewChild("curtimetext", { static: true }) curtimetext!: ElementRef;
  @ViewChild("durtimetext", { static: true }) durtimetext!: ElementRef;
  @ViewChild("volumeslider", { static: true }) volumeslider!: ElementRef;
  @ViewChild("subtitle",{static:true}) trackElem!:ElementRef;
  
  LargeFs=0; LargerFs=0; largebox=0; largebox2=0; XLargeFs=0;marginl=0;marginxl=0;marginxxl=0;title:any;  radios:any; output:any;track:any;support:any;
  feed:Feedback=new Feedback();  playpause:any; fullscreenbtn:any;  mutebtn:any;  caption:any; slow:any;  
  fast:any;  rating= 0;  back:any;  forward:any; pausecount=0; endcount=0;  backwards=0;phone!:string; 
  uploadername!:string; languages!:Language[]; upTimes:UploaderTime[]=[];transcriptDiv:any; nosupport=false;
  seniorid=localStorage.getItem('seniorid')!;video=localStorage.getItem('video')!; navlang=navigator.language.split('-')[0];
  videoid=parseInt(localStorage.getItem('videoid')!);lang=localStorage.getItem('lang')?.split('-')[0]
  link=this.transform(this.video);invisible=false;
  link3=this.transform(localStorage.getItem('sub'));
  transcript="C:\\PROJECT\\Layers\\Project\\API\\Transcripts\\"+localStorage.getItem('transcript') 
  t=""
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    this.addfeedback();
  }
  addfeedback(){
    if(this.videoplayer.nativeElement.currentTime!=this.videoplayer.nativeElement.duration)
      this.feed.MinutesStopped=this.videoplayer.nativeElement.currentTime
    else 
      this.feed.MinutesStopped=0;
    this.feed.Finish=this.endcount;
    this.feed.PauseCount=this.pausecount;
    this.feed.BackCount=this.backwards; 
    this.feed.VideoId=this.videoid;
    this.feed.IP_Address=this.seniorid!;
    this.feed.Stars=this.rating;
    this.feedbackservice.addFeedback(this.feed).subscribe();
  }
  gotosearch(){
    this.addfeedback();
    this.router.navigate(["/search"])
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) { 
    if(event.key == "m")
      this.vidmute()
    if(event.key == "k")
      this.playPause()
    if(event.key == "f")
      this.toggleFullScreen()
    if(event.key == "c")
      this.toggleCaption()
    if(event.key == "ArrowRight")
      this.goforward()
    if(event.key == "ArrowLeft")
      this.goback()
  }
  ngOnInit(): void {    
    this.videoplayer.nativeElement.removeAttribute('controls');
    this.subtitleservice.readtranscript(this.transcript).subscribe((res)=>this.t=res);
    this.feedbackservice.checkIfFeedback(this.seniorid,this.videoid).subscribe((res:any)=>{
      this.videoplayer.nativeElement.currentTime=res;
    })
    this.title= localStorage.getItem('title')!;
    this.titleservice.setTitle("video");
    this.uploadername=localStorage.getItem('UpName')!;
    this.languages=JSON.parse(localStorage.getItem('languages')!);
    this.upTimes=JSON.parse(localStorage.getItem('upTimes')!);    
    this.phone=localStorage.getItem('phone')!;
    console.log(JSON.parse(localStorage.getItem('isSupport')!)); 
    if(JSON.parse(localStorage.getItem('isSupport')!)==true){
        this.uploadertimesservice.IsSupport(parseInt(localStorage.getItem('uploaderid')!)).subscribe(res=>
            this.support=res)
    }
    else{this.nosupport=true;}
    this.radios = document.querySelectorAll('#star_rating input[type=radio]');
    this.output = document.querySelector('#star_rating output'); 
    this.playpause=document.getElementById("playpausebtn");
    this.fullscreenbtn = document.getElementById("fullscreenbtn");
    this.mutebtn=document.getElementById("mutebtn");
    this.caption=document.getElementById("captions");
    this.slow=document.getElementById("slow");
    this.fast=document.getElementById("fast")
    this.back=document.getElementById("back")
    this.forward=document.getElementById("forward");
    this.breakpointObserver
      .observe(['(min-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.invisible = true;
        } else {
          this.invisible = false;
        }
      });
  }
  transform(url:any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }    
  feedback(e:any){
    if(e.type=="pause"){
      this.pausecount++;
    }
    if(e.type=="ended"){
      this.endcount++;
    }
    console.log(this.pausecount);
    console.log(this.endcount);
  }  
  ngAfterViewInit() {
    this.playpause.addEventListener("click",()=>this.playPause()!,false);
    this.seekslider.nativeElement.addEventListener("change",()=>this.vidSeek()!,false);
    this.videoplayer.nativeElement.addEventListener("timeupdate",()=>this.seektimeupdate()!,false);
    this.mutebtn.addEventListener("click",()=>this.vidmute()!,false);
	  this.volumeslider.nativeElement.addEventListener("change",()=>this.setvolume()!,false);
    this.slow.addEventListener("click",()=>this.slower()!,false)
    this.fast.addEventListener("click",()=>this.faster()!,false)
    this.back.addEventListener("click",()=>this.goback()!,false)
    this.forward.addEventListener("click",()=>this.goforward()!,false)
    this.fullscreenbtn.addEventListener("click",()=>this.toggleFullScreen()!,false);
    this.caption.addEventListener("click",()=>this.toggleCaption()!,false);
    document.querySelectorAll('.star-rating input[name="rating"]').forEach((radio)=>{
      radio.addEventListener('change', ()=>{
        this.rating = Number((<HTMLInputElement>(document.querySelector('.star-rating input[name="rating"]:checked')))!.value);
        console.log(this.rating);
      });
    });
  }
  resizeIframe(obj:any){
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
 }
  goback(){
    this.backwards++;
    console.log(this.backwards);    
    var curmins = Math.floor(this.videoplayer.nativeElement.currentTime / 60);
    var cursecs = Math.floor(this.videoplayer.nativeElement.currentTime - curmins * 60);
    var sec=cursecs-10;
    if(sec==0 &&curmins==0){
      cursecs=0;
    }
    else if(sec<10){
      curmins-=1;
      cursecs=60+sec;
    }
    else{
      cursecs-=10;
    }
    if(curmins < 10){ this.curtimetext.nativeElement.innerHTML = "0"+curmins+":"; }
    else{this.curtimetext.nativeElement.innerHTML = curmins+":";}
    if(cursecs < 10){ this.curtimetext.nativeElement.innerHTML += "0"+cursecs; }
    else{ this.curtimetext.nativeElement.innerHTML += cursecs; }
    this.videoplayer.nativeElement.currentTime=curmins*60+cursecs;
    var nt = this.videoplayer.nativeElement.currentTime * (100 / this.videoplayer.nativeElement.duration);
    this.seekslider.nativeElement.value = nt;
  }
  
  goforward(){
    var curmins = Math.floor(this.videoplayer.nativeElement.currentTime / 60);
    var cursecs = Math.floor(this.videoplayer.nativeElement.currentTime - curmins * 60);
    var sec=cursecs+10;
    if(sec>=60){
      curmins+=1;
      cursecs=sec-60;
    }
    else{
      cursecs+=10;
    }
    this.videoplayer.nativeElement.currentTime=curmins*60+cursecs;
    if(this.videoplayer.nativeElement.currentTime>=this.videoplayer.nativeElement.duration){
      this.videoplayer.nativeElement.currentTime=0;
      this.playPause();
      this.curtimetext.nativeElement.innerHTML = "00:00";
    }
    else{
    if(curmins < 10){ this.curtimetext.nativeElement.innerHTML = "0"+curmins+":"; }
    else{this.curtimetext.nativeElement.innerHTML = curmins+":";}
    if(cursecs < 10){ this.curtimetext.nativeElement.innerHTML += "0"+cursecs; }
    else{ this.curtimetext.nativeElement.innerHTML += cursecs; }
    }
    var nt = this.videoplayer.nativeElement.currentTime * (100 / this.videoplayer.nativeElement.duration);
    this.seekslider.nativeElement.value = nt;
  }
  faster() {
    if(this.videoplayer.nativeElement.playbackRate<2)
    this.videoplayer.nativeElement.playbackRate+=0.5
  }
  slower() {
    if(this.videoplayer.nativeElement.playbackRate>0.5)
      this.videoplayer.nativeElement.playbackRate-=0.5
  }
  
  playPause(){
    if(this.videoplayer.nativeElement.paused || this.videoplayer.nativeElement.ended){
      this.videoplayer.nativeElement.play();
      this.playpause.ariaLabel="pause video"
      this.playpause.style.background = "url(../../../../assets/pause.png)";
      this.playpause.style.backgroundRepeat= "no-repeat";

    } else {
      this.videoplayer.nativeElement.pause();
      this.playpause.ariaLabel="play video"
      this.playpause.style.background = "url(../../../../assets/play.png)";
      this.playpause.style.backgroundRepeat= "no-repeat";
    }
  }
  vidSeek(){
    var seekto = this.videoplayer.nativeElement.duration * (this.seekslider.nativeElement.value / 100);
    this.videoplayer.nativeElement.currentTime = seekto;
  }
  seektimeupdate(){
    var nt = this.videoplayer.nativeElement.currentTime * (100 / this.videoplayer.nativeElement.duration);
    this.seekslider.nativeElement.value = nt;
    var curmins = Math.floor(this.videoplayer.nativeElement.currentTime / 60);
    var cursecs = Math.floor(this.videoplayer.nativeElement.currentTime - curmins * 60);
    var durmins = Math.floor(this.videoplayer.nativeElement.duration / 60);
    var dursecs = Math.floor(this.videoplayer.nativeElement.duration - durmins * 60);
    if(curmins < 10){ this.curtimetext.nativeElement.innerHTML = "0"+curmins+":"; }
    else{this.curtimetext.nativeElement.innerHTML = curmins+":";}
    if(cursecs < 10){ this.curtimetext.nativeElement.innerHTML += "0"+cursecs; }
    else{ this.curtimetext.nativeElement.innerHTML += cursecs; }
    if(durmins < 10){ this.durtimetext.nativeElement.innerHTML = "0"+durmins+":"; }
    else{this.durtimetext.nativeElement.innerHTML = durmins+":"}
    if(dursecs < 10){ this.durtimetext.nativeElement.innerHTML += "0"+dursecs; }
    else{this.durtimetext.nativeElement.innerHTML += dursecs;}
  }
  vidmute(){
    if(this.videoplayer.nativeElement.muted){
      this.videoplayer.nativeElement.muted = false;
      this.mutebtn.ariaLabel="unmute video"
      this.mutebtn.ariaPressed="true"
      this.mutebtn.style.background="url(../../../../assets/volume_up.png)"
    } else {
      this.videoplayer.nativeElement.muted = true;
      this.mutebtn.ariaLabel="mute video"
      this.mutebtn.ariaPressed="false"
      this.mutebtn.style.background="url(../../../../assets/volume_off.png)"
    }
  }
  setvolume(){
    this.videoplayer.nativeElement.volume = this.volumeslider.nativeElement.value / 100;
  }
  toggleFullScreen(){
    if(this.videoplayer.nativeElement.requestFullScreen){
      this.videoplayer.nativeElement.requestFullScreen();
    } else if(this.videoplayer.nativeElement.webkitRequestFullScreen){
      this.videoplayer.nativeElement.webkitRequestFullScreen();
    } else if(this.videoplayer.nativeElement.mozRequestFullScreen){
      this.videoplayer.nativeElement.mozRequestFullScreen();
    }
  }
  
 toggleCaption(){
   if(this.videoplayer.nativeElement.textTracks[0].mode == 'hidden'){
    this.videoplayer.nativeElement.textTracks[0].mode = 'showing';
    this.caption.ariaLabel="disable subtitles"
    this.caption.ariaPressed="true"
    this.caption.style.background="url(../../../../assets/disabledCaptions.png)"
    this.caption.style.backgroundRepeat= "no-repeat";
   } else {
    this.videoplayer.nativeElement.textTracks[0].mode = 'hidden';
    this.caption.ariaLabel="enable subtitles"
    this.caption.ariaPressed="false"
     this.caption.style.background="url(../../../../assets/caption.png)";
     this.caption.style.backgroundRepeat= "no-repeat";
   }
 }
large(){
  this.LargeFs=6; 
  this.LargerFs=0;
  this.XLargeFs=0;
  this.largebox=10;
  this.largebox2=10;
  this.marginl=3;
  this.marginxl=0;
  this.marginxxl=0;
}
larger(){
  this.LargeFs=0; 
  this.LargerFs=10;
  this.XLargeFs=0;
  this.largebox=40;
  this.largebox2=100;
  this.marginxl=6;
  this.marginl=0;
  this.marginxxl=0;
}
x_large(){
  this.LargeFs=0; 
  this.LargerFs=0;
  this.XLargeFs=14;
  this.largebox=30;
  this.largebox2=150;
  this.marginxl=0;
  this.marginl=0;
  this.marginxxl=9;
}

}
 
