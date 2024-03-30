import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  msgError:string = '';
  submitting: boolean = false;

  resetForm: FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^([A-Z][a-z0-9]{6,20})$/)]),
  });

  handleButton(): void {
    this.submitting = true;
    if(this.resetForm.valid)
    {
    
      
    this._AuthService.resetPassword(this.resetForm.value).subscribe({
      next:(response)=>{
          this._Router.navigate(['/login'])
      },
      error:(err:HttpErrorResponse)=>{
        this.msgError = err.error.message
        this.submitting = false;
      }
    })
  }
  else{
    this.resetForm.markAllAsTouched()
    this.submitting = false;

  }
} 
}
