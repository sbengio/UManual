import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Buyer } from 'src/app/shared/models/buyer.model';
import { Income } from 'src/app/shared/models/income.model';
import { Video } from 'src/app/shared/models/video.model';
import { BuyerService } from 'src/app/shared/services/buyer.service';
import { IncomeService } from 'src/app/shared/services/income.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-buyers-data',
  templateUrl: './buyers-data.component.html',
  styleUrls: ['./buyers-data.component.css']
})
export class BuyersDataComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  public displayedColumns=['buyers'];
  public displayedColumns2=['title','video','views','rating']
  buyers:Buyer[]=[]; incomes:Income[]=[]; buyer:boolean=false
  countVideos:any;
  constructor(private titleservice:Title,private incomeservice:IncomeService,
    private buyerservice:BuyerService,private videoservice:VideoService,
    private observer:BreakpointObserver,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.titleservice.setTitle("buyers data");
    this.videoservice.GetVideosForApproval().subscribe(res=>this.countVideos=res.length);
    this.buyerservice.getAllBuyers().subscribe(res=>this.buyers=res);
  }
  getVideos(id:number){
    this.buyer=true;
    this.incomeservice.getAllIncomesBybuyerid(id).subscribe(res=>{
      this.incomes=res;
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

}
