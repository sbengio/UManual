import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Video } from 'src/app/shared/models/video.model';
import { UploadService } from 'src/app/shared/services/upload.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { environment } from 'src/environments/environment';
import { BlockedVideosDialogComponent } from '../blocked-videos-dialog/blocked-videos-dialog.component';

@Component({
  selector: 'app-blocked-videos',
  templateUrl: './blocked-videos.component.html',
  styleUrls: ['./blocked-videos.component.css']
})
export class BlockedVideosComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  public videos:Video[]=[]
  public avgFeedback:[]=[]
  upID!:number; searched:any; EditForm: any; num:any; countBlockedVideos:any; showing=false;
  displayedColumns:string[]=['title','video','earnings','views','rating','save']
  
  constructor(private observer:BreakpointObserver,private dialog: MatDialog,
    private titleservice:Title,private videoservice:VideoService,
    private cdr: ChangeDetectorRef,private route:Router) { }

  ngOnInit(): void {
    this.titleservice.setTitle("Blocked videos");
    this.upID = JSON.parse(localStorage.getItem('uploader')!).Id;
    this.videoservice.getBlockedVideos(this.upID).subscribe(res=>{this.videos=res})
    this.videoservice.BlockedVideos(this.upID!).subscribe(res=>this.countBlockedVideos=res)
  }
  blockedVideos(){
    this.route.navigate(['/blocked']);
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
  edit(element:Video){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('Code',element.LanguageCode!);
    localStorage.setItem('Id',element.LanguageId!.toString())
    let dialogRef = this.dialog.open(BlockedVideosDialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if(result!=undefined){
      let vid=element;
      vid.SubUrl=result.SubUrl
      vid.Duration=result.Duration;
      vid.LanguageId=result.LanguageId;
      vid.Url=result.Url;
      vid.Approved=false;
      vid.Blocked=false;
      this.videoservice.updateVideo(vid).subscribe(()=>{
        this.videoservice.getBlockedVideos(this.upID).subscribe(res=>{this.videos=res})
        this.videoservice.BlockedVideos(this.upID!).subscribe(res=>this.countBlockedVideos=res)
      })}})
  }
}
