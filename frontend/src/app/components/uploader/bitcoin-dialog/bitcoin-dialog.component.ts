import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bitcoin-dialog',
  templateUrl: './bitcoin-dialog.component.html',
  styleUrls: ['./bitcoin-dialog.component.css']
})
export class BitcoinDialogComponent implements OnInit {
  WithdrawForm!:FormGroup
  constructor(public dialogRef: MatDialogRef<BitcoinDialogComponent>) { }

  ngOnInit(): void {
    this.WithdrawForm = new FormGroup({
      'branch' : new FormControl('', [Validators.required]),
      'name' : new FormControl('',[Validators.required]),
      'accnumber' : new FormControl('',[Validators.required])
    });
  }
  
  close(){
    this.dialogRef.close()
  }
}
