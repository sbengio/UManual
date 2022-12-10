import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Video } from 'src/app/shared/models/video.model';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
Videos:Array<Video>=[]
  LargeFs=0;
  XLargeFs=0;
  LargerFs=0;
  largebox=0;invisible=false;
  constructor(private titleservice:Title,public breakpointObserver: BreakpointObserver) { }
  public searches=JSON.parse( localStorage.getItem('data')!);
  public displayedColumns=['search','date'];
  ngOnInit(): void {
    this.titleservice.setTitle("search history"); 
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
  large(){
    this.LargeFs=6; 
    this.LargerFs=0;
    this.XLargeFs=0;
    this.largebox=0;
  }
  larger(){
    this.LargeFs=0; 
    this.LargerFs=10;
    this.XLargeFs=0;
    this.largebox=40;
  }
  x_large(){
    this.LargeFs=0; 
    this.LargerFs=0;
    this.XLargeFs=14;
    this.largebox=46;
  }
}
