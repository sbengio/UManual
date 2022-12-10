import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-card-dialog',
  templateUrl: './credit-card-dialog.component.html',
  styleUrls: ['./credit-card-dialog.component.css']
})
export class CreditCardDialogComponent implements OnInit {

  WithdrawForm!:FormGroup
  constructor(public dialogRef: MatDialogRef<CreditCardDialogComponent>) { }

  ngOnInit(): void {
    this.WithdrawForm = new FormGroup({
      'name' : new FormControl('', [Validators.required]),
      'number' : new FormControl('', [Validators.required]),
      'date' : new FormControl('',[Validators.required]),
      'cvv' : new FormControl('',[Validators.required])
    });
  }
  close(){
    this.dialogRef.close()
  }

  

}
