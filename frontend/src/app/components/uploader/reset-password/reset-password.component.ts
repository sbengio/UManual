import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { BuyerService } from 'src/app/shared/services/buyer.service';
import { IncomeService } from 'src/app/shared/services/income.service';
import { UploaderService } from 'src/app/shared/services/uploader.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return invalidCtrl || invalidParent;
  }
}
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  exists=true
  hide=true;
  matcher=new MyErrorStateMatcher()
  matcher2=new MyErrorStateMatcher()
  resetpasswordForm:any;
  passwordForm:any
  constructor(private titleservice:Title,private uploaderService:UploaderService,
    private route:Router,private buyerservice:BuyerService) { }

  ngOnInit(): void {
    this.titleservice.setTitle("Reset password");
    this.resetpasswordForm=new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    },{asyncValidators:[this.buyerexists,this.uploaderexists]})
    this.passwordForm= new FormGroup({
      'Password' : new FormControl(null,[Validators.required,Validators.minLength(7)]),
      'ConfirmPassword' : new FormControl(null,[Validators.required])
    },{validators:this.checkPasswords})
    console.log(this.resetpasswordForm);
     
  }
  uploaderexists : AsyncValidatorFn  = (group: AbstractControl): Observable<ValidationErrors| null> => { 
    let e = group.get('email')?.value;
    console.log(this.resetpasswordForm.hasError('upExists'));
    return this.uploaderService.uploaderexists(e).pipe(
      map((res:boolean)=>res?null:{upExists:true})
    )
  }
  buyerexists : AsyncValidatorFn = (group: AbstractControl): Observable<ValidationErrors| null> => { 
    let e = group.get('email')?.value;
    console.log(this.resetpasswordForm.hasError('buyerExists'));
    return this.buyerservice.buyerexists(e).pipe(
      map((res:boolean)=>res?null:{ buyerExists: true }))
  }
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('Password')?.value;
    let confirmPass = group.get('ConfirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  } 
  onSubmit(){
    this.uploaderService.uploaderexists(this.resetpasswordForm.get('email').value).subscribe(res=>{
      console.log(res);
      if(res==true)
        this.uploaderService.resetpassword(this.resetpasswordForm.get('email').value,this.passwordForm.get('Password').value).subscribe()
      else this.buyerservice.resetpassword(this.resetpasswordForm.get('email').value,this.passwordForm.get('Password').value).subscribe()
      this.route.navigate(['/login']);
    })
    
  }
}
