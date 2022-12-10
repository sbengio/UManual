import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-paypal-dialog',
  templateUrl: './paypal-dialog.component.html',
  styleUrls: ['./paypal-dialog.component.css']
})
export class PaypalDialogComponent implements OnInit {

  WithdrawForm!:FormGroup
  constructor(public dialogRef: MatDialogRef<PaypalDialogComponent>) { }

  ngOnInit(): void {
    this.WithdrawForm = new FormGroup({
      'name' : new FormControl('', [Validators.required]),
      'email' : new FormControl('',[Validators.required]),
      'number' : new FormControl('',[Validators.required])
    });
  }
  close(){
    this.dialogRef.close()
  }

}
