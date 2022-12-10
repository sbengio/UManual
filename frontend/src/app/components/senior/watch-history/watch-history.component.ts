import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-watch-history',
  templateUrl: './watch-history.component.html',
  styleUrls: ['./watch-history.component.css']
})
export class WatchHistoryComponent implements OnInit {
  LargeFs=0;
  LargerFs=0;
  XLargeFs=0;
  largebox=0;
  invisible=false;
  constructor(private titleservice:Title,private route:Router,public breakpointObserver: BreakpointObserver) { }
  public watched=JSON.parse( localStorage.getItem('videodata')!);
  public displayedColumns=['date','video','play'];
  ngOnInit(): void {
    console.log(this.watched);
    this.titleservice.setTitle("watch history");
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

  watch(url:any,suburl:any){
    localStorage.setItem('video',url!);
    localStorage.setItem('sub',suburl)
    this.route.navigate(['/video'])
  }

  large(){
    this.LargeFs=6; 
    this.LargerFs=0;
    this.XLargeFs=0;
    this.largebox=0;
  }
  x_large(){
    this.LargeFs=0; 
    this.LargerFs=0;
    this.XLargeFs=14;
    this.largebox=46;
  }
  larger(){
    this.LargeFs=0; 
    this.LargerFs=10;
    this.XLargeFs=0;
    this.largebox=40;
  }
}
