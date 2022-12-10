import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Video } from 'src/app/shared/models/video.model';
import { SearchService } from 'src/app/shared/services/search.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-videos-for-approval',
  templateUrl: './videos-for-approval.component.html',
  styleUrls: ['./videos-for-approval.component.css']
})
export class VideosForApprovalComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  public videos:Video[]=[]
  countVideos:any;
  displayedColumns:string[]=['Device name','Video','Uploader name','Approved/not']

  constructor(private observer:BreakpointObserver,private videoservice:VideoService,
  private titleservice:Title,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.titleservice.setTitle("videos for approval");
    this.videoservice.GetVideosForApproval().subscribe(res=>
      {
        this.videos=res;
        this.countVideos=res.length
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
  check(video:Video){
    this.videoservice.ApproveVideo(video).subscribe(()=>{
      this.videoservice.GetVideosForApproval().subscribe(res=>
        {
          this.videos=res;
          this.countVideos=res.length
        }
      );
    });
  }


}
