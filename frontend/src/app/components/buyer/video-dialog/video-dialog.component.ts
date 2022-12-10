import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css']
})
export class VideoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VideoDialogComponent>,private sanitizer:DomSanitizer) { }
  link:any;
  link4:any;
  video=localStorage.getItem('video')!;
  ngOnInit(): void {
    this.link=this.transform(this.video);
    const link3=this.transform(localStorage.getItem('sub'));
    this.link4="https://res.cloudinary.com/dxjydzq3r/raw/upload/v1642944384/weh4z9nfpxpayvc4kuiw.vtt"
  }
  transform(url:any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  close(){
    this.dialogRef.close()
  }

}
