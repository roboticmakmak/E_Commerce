import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})

export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router , private toastr: ToastrService){}
  msgError:string = '';
  submitting: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('' , [Validators.required, Validators.minLength(3),Validators.maxLength(100)]),
    email: new FormControl('' , [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^([A-Z][a-z0-9]{6,20})$/)]),
    rePassword: new FormControl(''),
    phone:new FormControl('', [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators:[this.confirmPassword]} as FormControlOptions);

  confirmPassword(group:FormGroup):void{

    let password =  group.get('password')
    let rePassword = group.get('rePassword')

      if(rePassword?.value == '')
      {
        rePassword?.setErrors({required:true})
      }
      else if(password?.value != rePassword?.value)
      {
        rePassword?.setErrors({mismatch:true})
      }

}

showPassword: boolean = false;

togglePasswordVisibility(fieldId: string): void {
    const passwordField = document.getElementById(fieldId) as HTMLInputElement;
    if (passwordField) {
        this.showPassword = !this.showPassword;
        passwordField.type = this.showPassword ? 'text' : 'password';
    }
}

showRePassword: boolean = false;

togglePasswordVisibility2(fieldId: string): void {
    const passwordField = document.getElementById(fieldId) as HTMLInputElement;
    if (passwordField) {
        this.showRePassword = !this.showRePassword;
        passwordField.type = this.showRePassword ? 'text' : 'password';
    }
}

handleButton() {
  if (this.registerForm.valid) {
    this.submitting = true;
    this._AuthService.setRegister(this.registerForm.value).subscribe({
      next: (response) => {
        if (response.message == 'success') {
          this.toastr.success('Account created successfully. Please login.', 'Success');
          this._Router.navigate(['/login']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.msgError = err.error.message;
        this.submitting = false;
      }
    });
  } else {
    this.registerForm.markAllAsTouched();
    this.submitting = false;
  }
}
}