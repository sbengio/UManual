import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { ViewService } from 'src/app/shared/services/view.service';
import { Chart , registerables} from 'chart.js';
import { VideoService } from 'src/app/shared/services/video.service';
import { R3TargetBinder } from '@angular/compiler';

@Component({
  selector: 'app-stats-admin',
  templateUrl: './stats-admin.component.html',
  styleUrls: ['./stats-admin.component.css']
})
export class StatsAdminComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  chart:any=[]
  chart2:any=[]
  years:any=[]
  views:any=[]
  vidyears:any=[]
  uploaded:any=[]
  countVideos:any
  constructor(private observer:BreakpointObserver,private titleservice:Title,
    private viewservice:ViewService,private videoService:VideoService,private cdr: ChangeDetectorRef) {
    Chart.register(...registerables)
   }

  ngOnInit(): void {
    this.titleservice.setTitle("statistics");
    this.videoService.GetVideosForApproval().subscribe(res=>this.countVideos=res.length);
    this.viewservice.getViews().subscribe(res=> {
      let year:any;
      for (let index = 0; index < res.length; index++) {
        if(new Date(res[index].Date!).getFullYear()==year)
          continue;
        year=new Date(res[index].Date!).getFullYear();
        let yearViews=res.filter(a=>new Date(a.Date!).getFullYear()==year).length
        this.years.push(year);
        this.views.push(yearViews);
      }  
   
      //chart
      this.chart=new Chart('canvas',{
        type: 'line',
        data: {
          labels: this.years,
          datasets: [{
              label: '# of Views',
              data: this.views,
              backgroundColor: '#F58735',
              borderColor: 'rgb(20,93,182)',
              borderWidth: 1,
              fill:true 
          }]
        },
        options:  {
          scales:{
            y: {
              title: {
                display: true,
                text: 'Views',
                color:'rgb(20,93,182)',
                font:{size:16}
              },
              grid:{
                borderColor:'rgb(20,93,182)',
                display:false
              },
              ticks:{
                color:'rgb(20,93,182)',
                font:{size:14}
              }
            },
            x: {
              title: {
                display: true,
                text: 'Years',
                color:'rgb(20,93,182)',
                font:{size:16}
              },
              grid:{
                borderColor:'rgb(20,93,182)',
              },
              ticks:{
                color:'rgb(20,93,182)',
                font:{size:14}
              }
            }
          },
          plugins:{
            legend:{
              labels:{
                color:'rgb(20,93,182)',
                font:{size:16}
              }
            }
          }
        }
      });
    });
    this.videoService.getAllVideos().subscribe(res=>{
      let year:any;
      console.log(res);
      
      for (let index = 0; index < res.length; index++) {
        if(new Date(res[index].Date!).getFullYear()==year)
          continue;
        year=new Date(res[index].Date!).getFullYear();
        let uploadedVideos=res.filter(a=>new Date(a.Date!).getFullYear()==year).length
        this.vidyears.push(year);
        this.uploaded.push(uploadedVideos);
      }
      
      //chart2
      this.chart2=new Chart('canvas2',{
        type: 'line',
        data: {
          labels: this.vidyears,
          datasets: [{
              label: '# of Uploaded videos',
              data: this.uploaded,
              backgroundColor: '#F58735',
              borderColor: 'rgb(20,93,182)',
              borderWidth: 1,
              fill:true
          }]
        },
        options:  {
          scales:{
            y: {
              title: {
                display: true,
                text: 'Uploaded videos',
                color:'rgb(20,93,182)',
                font:{size:16}
              },
              grid:{
                borderColor:'rgb(20,93,182)',
                display:false
              },
              ticks:{
                color:'rgb(20,93,182)',
                font:{size:14}
              }
            },
            x: {
              title: {
                display: true,
                text: 'Years',
                color:'rgb(20,93,182)',
                font:{size:16}
              },
              grid:{
                borderColor:'rgb(20,93,182)',
                display:false
              },
              ticks:{
                color:'rgb(20,93,182)',
                font:{size:14}
              }
            }
          },
          plugins:{
            legend:{
              labels:{
                color:'rgb(20,93,182)',
                font:{size:16}
              }
            }
          }
        }
      });
    })
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
