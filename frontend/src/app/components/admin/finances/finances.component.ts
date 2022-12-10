import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { VideoService } from 'src/app/shared/services/video.service';
import { Chart , registerables, TooltipItem, TooltipModel} from 'chart.js';
import { IncomeService } from 'src/app/shared/services/income.service';
import { ViewService } from 'src/app/shared/services/view.service';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  countVideos:any
  chart:any=[];
  years:any=[];incomes:any=[];outgoings:any=[]
  constructor(private observer:BreakpointObserver,private titleservice:Title,
    private incomeservice:IncomeService,private cdr: ChangeDetectorRef,
    private videoservice:VideoService,private viewservice:ViewService ) {
      Chart.register(...registerables)
     }

  ngOnInit(): void {
    this.titleservice.setTitle("finances");
    this.videoservice.GetVideosForApproval().subscribe(res=>this.countVideos=res.length);
    this.incomeservice.getAllIncomes().subscribe(res=> {
      let year:any;
      for (let index = 0; index < res.length; index++) {
        if(new Date(res[index].Date!).getFullYear()==year)
          continue;
        year=new Date(res[index].Date!).getFullYear();
        let monthIncomes=res.filter(a=>new Date(a.Date!).getFullYear()==year).length*5
        this.years.push(year);
        this.incomes.push(monthIncomes);
      } 
      this.viewservice.getViews().subscribe(res=> {
        console.log(res);
        let year:any;
        for (let index = 0; index < res.length; index++) {
          if(new Date(res[index].Date!).getFullYear()==year)
            continue;
          year=new Date(res[index].Date!).getFullYear();
          let yearViews=res.filter(a=>new Date(a.Date!).getFullYear()==year).length
          let yearEarnings=yearViews*0.5
          this.outgoings.push(yearEarnings)
        }
     this.chart=new Chart('canvas',{
      type: 'bar',
      data: {
        labels: this.years,
        datasets: [{
            label: 'Income',
            data: this.incomes,
            backgroundColor: '#F58735',
            borderColor: '#F58735',
            borderWidth: 1 
        },{
          label: 'Outgoings',
          data: this.outgoings,
          backgroundColor: 'rgb(20,93,182)',
          borderColor: 'rgb(20,93,182)',
          borderWidth: 1 
        }]},
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
    });});}); 
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
