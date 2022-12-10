import { Component, EventEmitter, OnInit } from '@angular/core';
import { Uploader } from 'src/app/shared/models/uploader.model';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import { FormGroup,FormControl,Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Router} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ErrorStateMatcher } from '@angular/material/core';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Observable} from 'rxjs';
import{map} from 'rxjs/operators';
import { BuyerService } from 'src/app/shared/services/buyer.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return invalidCtrl || invalidParent;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide=true
  loginForm: any
  loginflag:boolean=true
  matcher = new MyErrorStateMatcher();
  uploaders:Array<Uploader>=[]
  public uploader!:Uploader;
  constructor(private uploaderService:UploaderService,private route:Router,private titleservice:Title,
    private adminservice:AdminService,private buyerservice:BuyerService) { }

  ngOnInit(): void {
    this.titleservice.setTitle("Login");
    this.loginForm = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password' : new FormControl('',[Validators.required,Validators.minLength(7)]),
    }, { asyncValidators: [this.emailpasswordmatch,this.emailpasswordmatchAdmin,this.emailpasswordmatchBuyer ]}
    );
    
  }
  emailpasswordmatch: AsyncValidatorFn = (group: AbstractControl): Observable<ValidationErrors| null> => { 
    let e = group.get('email')?.value;
    console.log(this.loginForm);
    
    let Pass = group.get('password')?.value
    return this.uploaderService.exist(e,Pass).pipe(
      map((res:boolean)=>res? null : { notSame: true }))
  }
  emailpasswordmatchAdmin: AsyncValidatorFn = (group: AbstractControl): Observable<ValidationErrors| null> => { 
    let e = group.get('email')?.value;
    let Pass = group.get('password')?.value
    return this.adminservice.CheckIfAdmin(e,Pass).pipe(
      map((res:boolean)=>res?null:{ notSameAdmin: true }))
  }
  emailpasswordmatchBuyer: AsyncValidatorFn = (group: AbstractControl): Observable<ValidationErrors| null> => { 
    let e = group.get('email')?.value;
    let Pass = group.get('password')?.value
    return this.buyerservice.exist(e,Pass).pipe(
      map((res:boolean)=>res?null:{ notSameBuyer: true }))
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  loadUploaders(){
    this.uploaderService.getAllUploaders().subscribe(res=>{res==this.uploaders})
  }
  onSubmit(){
    let isAdmin=false;
    this.adminservice.CheckIfAdmin(this.email.value,this.password.value).subscribe(res=>{
      isAdmin=res;
      this.buyerservice.login(this.email.value,this.password.value).subscribe(res=>{
        if(res!=null){
          localStorage.setItem('buyer',JSON.stringify(res));
          this.route.navigate(['/buyers']);
        }
          this.uploaderService.login(this.email.value,this.password.value).subscribe(res=>{
            this.uploader=res;
            if(this.uploader!=null){
              localStorage.setItem('uploader',JSON.stringify(this.uploader));
              localStorage.setItem('times',JSON.stringify([]));
              this.route.navigate(['/upload']);
            }
            else if(isAdmin)
              this.route.navigate(['/videosforapproval']);
            }); });});     
  }
  }

