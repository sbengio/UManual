import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreditCardDialogComponent } from '../credit-card-dialog/credit-card-dialog.component';
import { BitcoinDialogComponent } from '../bitcoin-dialog/bitcoin-dialog.component';
import { PaypalDialogComponent } from '../paypal-dialog/paypal-dialog.component';
import { VideoService } from 'src/app/shared/services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.component.html',
  styleUrls: ['./withdraws.component.css']
})
export class WithdrawsComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!:MatSidenav
  earnings:any
  countBlockedVideos:any

  constructor(private observer:BreakpointObserver,private titleservice:Title, private dialog: MatDialog,
    private cdr: ChangeDetectorRef,private videoservice:VideoService,private route:Router) { }

  ngOnInit(): void {
    this.titleservice.setTitle("Withdraw");
    console.log(JSON.parse(localStorage.getItem('uploader')!));
    this.videoservice.BlockedVideos(JSON.parse(localStorage.getItem('uploader')!).Id).subscribe(res=>this.countBlockedVideos=res)
    this.earnings = JSON.parse(localStorage.getItem('uploader')!).Earnings;
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
  creditcarddialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(CreditCardDialogComponent,dialogConfig);
  }
  paypaldialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(PaypalDialogComponent,dialogConfig);
  }
  bitdialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(BitcoinDialogComponent,dialogConfig);
  }
  blockedVideos(){
    this.route.navigate(['/blocked']);
  }
}
