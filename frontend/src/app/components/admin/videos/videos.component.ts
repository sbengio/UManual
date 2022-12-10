import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Video } from 'src/app/shared/models/video.model';
import { SearchService } from 'src/app/shared/services/search.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  countVideos:any
  num:any;
  searched:any
  public videos:Video[]=[]
  displayedColumns:string[]=['Device name','Video','Uploader name','Date','Blocked','Views','Disabled','Average rating','Delete']

  constructor(private observer:BreakpointObserver,private videoservice:VideoService,
    private searchService:SearchService,private titleservice:Title,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.titleservice.setTitle("videos");
    this.videoservice.getAllVideos().subscribe(res=>{
      this.videos=res;  
    });
    this.videoservice.GetVideosForApproval().subscribe(res=>this.countVideos=res.length);
    
  }
  reload(){
    this.videoservice.getAllVideos().subscribe(res=>{
      this.videos=res;  
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
  freeSearch(searchText:string)
  {
     this.searchService.FreeStyleSearch(searchText.toLowerCase()).subscribe(res=>{
      if (res!=null) 
      {
        this.searched=true;
        this.videos=res;
        this.num=this.videos.length;
      }
      else {this.num="No";console.log("no results found");}
    }) 
  }
  remove(VideoId:number){
    this.videoservice.removeVideo(VideoId).subscribe(res=>{
      this.videoservice.getAllVideos().subscribe(res=>{
        this.videos=res;  
      });
    })
  }

}
