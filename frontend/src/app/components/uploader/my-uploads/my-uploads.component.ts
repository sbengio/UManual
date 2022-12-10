import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Video } from 'src/app/shared/models/video.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { ViewService } from 'src/app/shared/services/view.service';

@Component({
  selector: 'app-my-uploads',
  templateUrl: './my-uploads.component.html',
  styleUrls: ['./my-uploads.component.css']
})
export class MyUploadsComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  public videos:Video[]=[]
  public avgFeedback:[]=[]
  upID!:number; searched:any; EditForm: any; num:any; countBlockedVideos:any;
  displayedColumns:string[]=['title','video','earnings','views','Approved/not','Blocked/not','rating','delete']
  
  constructor(private observer:BreakpointObserver,
    private titleservice:Title,private videoservice:VideoService,
    private searchService:SearchService,private viewservice:ViewService,
    private cdr: ChangeDetectorRef,private route:Router,private feedbackservice:FeedbackService) { }

  ngOnInit(): void {
    this.titleservice.setTitle("My uploads");
    this.upID = JSON.parse(localStorage.getItem('uploader')!).Id;
    this.videoservice.getVideosByUploaderID(this.upID).subscribe(res=>{
      this.videos=res;
    })
    this.videoservice.BlockedVideos(this.upID!).subscribe(res=>this.countBlockedVideos=res)
  }
  blockedVideos(){
    this.route.navigate(['/blocked']);
  }
  freeSearch(searchText:string)
  {
    if(searchText!=""){
    this.searchService.FreeSearchForUploader(searchText.toLowerCase(),this.upID).subscribe(
      (res:any)=>
      {
        if (res!=null){
          this.searched=true;
          this.videos=res;
          this.num=this.videos.length;
        }
        else {this.num="No";console.log("no results found");this.videos=[];}         
      }
    )}
  }
  reload(){
    this.videoservice.getVideosByUploaderID(this.upID).subscribe(res=>{
      this.videos=res;
      this.searched=false;
      this.num='';
      (document.getElementById('searchInput') as HTMLInputElement).value=""
    })
  }
  remove(id:number){
      this.videoservice.removeVideo(id).subscribe(res=>{
      this.videoservice.getVideosByUploaderID(this.upID).subscribe(res=>{
        this.videos=res;
    })});
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
