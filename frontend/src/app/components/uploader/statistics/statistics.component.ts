import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { ViewService } from 'src/app/shared/services/view.service';
import { Chart , registerables} from 'chart.js';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!:MatSidenav;
  chart:any=[]; chart2:any=[]; years:any=[]; views:any=[]; earnings:any=[];  uploaderId:any; countBlockedVideos:any
  constructor(private observer:BreakpointObserver, private titleservice:Title,private viewservice:ViewService,
    private cdr: ChangeDetectorRef,private videoservice:VideoService,private route:Router) { 
      Chart.register(...registerables)
    }
  
  ngOnInit(): void {
    this.titleservice.setTitle("Statistics");
    this.uploaderId = JSON.parse(localStorage.getItem('uploader')!).Id;
    this.videoservice.BlockedVideos(this.uploaderId!).subscribe(res=>this.countBlockedVideos=res)
    this.viewservice.getViewsByUploader(this.uploaderId).subscribe(res=> {
      console.log(res);
      let year:any;
      for (let index = 0; index < res.length; index++) {
        if(new Date(res[index].Date!).getFullYear()==year)
          continue;
        year=new Date(res[index].Date!).getFullYear();
        let yearViews=res.filter(a=>new Date(a.Date!).getFullYear()==year).length
        let yearEarnings=yearViews*0.5
        this.years.push(year);
        this.views.push(yearViews);
        this.earnings.push(yearEarnings)
      }
      console.log(this.years);
      console.log(this.views);
      console.log(this.earnings);
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
              borderWidth: 1 ,
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
      //chart2
      this.chart2=new Chart('canvas2',{
        type: 'line',
        data: {
          labels: this.years,
          datasets: [{
              label: 'Earnings',
              data: this.earnings,
              backgroundColor: '#F58735',
              borderColor: 'rgb(20,93,182)',
              borderWidth: 1 ,
              fill:true
          }]
        },
        options:  {
          scales:{
            y: {
              title: {
                display: true,
                text: 'Dollars ($)',
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
          plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            },
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
  blockedVideos(){
    this.route.navigate(['/blocked']);
  }

}
