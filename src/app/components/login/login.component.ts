import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  msgError:string = '';
  submitting: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^([A-Z][a-z0-9]{6,20})$/)]),
  });

  handleButton(): void {
    this.submitting = true;
    if(this.loginForm.valid)
    {
    
      
    this._AuthService.setLogin(this.loginForm.value).subscribe({
      next:(response)=>{
     if (response.message == 'success')
     {

localStorage.setItem('eToken',response.token);
this._AuthService.saveUserData();

          this._Router.navigate(['/home'])
     }
      },
      error:(err:HttpErrorResponse)=>{
        this.msgError = err.error.message
        this.submitting = false;
      }
    })
  }
  else{
    this.loginForm.markAllAsTouched()
    this.submitting = false;

  }
} 
}
