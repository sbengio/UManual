import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Uploader } from 'src/app/shared/models/uploader.model';
import { Video } from 'src/app/shared/models/video.model';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import { UploaderTimeService } from 'src/app/shared/services/uploadertime.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { ViewService } from 'src/app/shared/services/view.service';

@Component({
  selector: 'app-uploaders',
  templateUrl: './uploaders.component.html',
  styleUrls: ['./uploaders.component.css']
})
export class UploadersComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!:MatSidenav
  videos!:Video[]
  countVideos:any
  public uploaders:Uploader[]=[]
  videosDelete:Video[]=[]
  displayedColumns:string[]=['Name','Email','Phone','Number of videos','Average rating','Earnings','delete']

  constructor(private observer:BreakpointObserver,private uploaderservice:UploaderService,
    private videoservice:VideoService,private uploadertimeservice:UploaderTimeService,
    private feedbackservice:FeedbackService,private viewservice:ViewService,
    private titleservice:Title,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.titleservice.setTitle("uploaders");
    this.videoservice.GetVideosForApproval().subscribe(res=>this.countVideos=res.length);
    this.loadtable();
  }
  loadtable(){
    this.uploaderservice.getAllUploaders().subscribe(res=>{
      this.uploaders=res;
      for (let index = 0; index < this.uploaders.length; index++) {
        var id=this.uploaders[index].Id;
        this.videoservice.getVideosByUploaderID(id!).subscribe(res=>{
          this.uploaders[index].numberOfVideos=res.length;
        })
      }
    });
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
  remove(uploader:Uploader){
    this.videoservice.removeVideosOfUploader(uploader.Id!).subscribe(res=>{
      this.uploaderservice.removeUploader(uploader.Id!).subscribe();
    });   
  }

}
