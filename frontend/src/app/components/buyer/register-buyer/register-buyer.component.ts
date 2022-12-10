import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStep, MatStepper, StepperOrientation} from '@angular/material/stepper';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Buyer } from 'src/app/shared/models/buyer.model';
import { BuyerService } from 'src/app/shared/services/buyer.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return invalidCtrl || invalidParent;
  }
}       
@Component({
  selector: 'app-register-buyer',
  templateUrl: './register-buyer.component.html',
  styleUrls: ['./register-buyer.component.css']
})
export class RegisterBuyerComponent implements OnInit {

  stepperOrientation: Observable<StepperOrientation>;
  buyerform!:any;matcher=new MyErrorStateMatcher();
  buyer:Buyer=new Buyer();hide=true;
  constructor(breakpointObserver: BreakpointObserver,private _formBuilder: FormBuilder,
    private titleservice:Title,private buyerservice:BuyerService,private route:Router) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
    .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
   }
  get details():FormArray{
    return this.buyerform.get('details') as FormArray
  }
  ngOnInit(): void {
    this.titleservice.setTitle("register");
    this.buyerform=this._formBuilder.group({
      details:this._formBuilder.array([
        this._formBuilder.group({
        Name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        Email :  ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        Password:['', [Validators.required,Validators.minLength(7)]],
        ConfirmPassword:['', Validators.required],
        }),
        this._formBuilder.group({
        Cardholdername:['', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        Cardnumbers:['',[Validators.required,Validators.minLength(13),Validators.maxLength(19)]],
        Cvv:['',[Validators.required,Validators.maxLength(4),Validators.minLength(3)]],
        Expirydate:['',[Validators.required,Validators.maxLength(4),Validators.minLength(4)]]
      })
    ])}, { validators: this.checkPasswords })
  }
  checkPasswords: ValidatorFn = (control: AbstractControl):  ValidationErrors | null => { 
    let pass = (<FormArray>control.get('details')).at(0).value.Password;
    let confirmPass = (<FormArray>control.get('details')).at(0).value.ConfirmPassword
    return pass === confirmPass ? null : { notSame: true }
  }  
  Register(){
    this.buyer.Name=(<FormArray>this.buyerform.get('details')).at(0).value.Name
    this.buyer.Email=(<FormArray>this.buyerform.get('details')).at(0).value.Email
    this.buyer.Password=(<FormArray>this.buyerform.get('details')).at(0).value.Password
    this.buyer.CreditCardNumbers=Number(((<FormArray>this.buyerform.get('details')).at(1).value.Cardnumbers).toString().slice(-4))
    this.buyerservice.addBuyer(this.buyer).subscribe(res=>{
      this.route.navigate(['/login']);
    })
  }
}
