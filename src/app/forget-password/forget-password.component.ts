import { Component } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  msgSuccess:any
  msgSu:any
  showForgetPassword = true;
  showVerifyCode = false;
constructor(private _AuthService:AuthService , private _Router:Router){}


verifyCode = new FormGroup({
  resetCode: new FormControl(),
})
verifyReset(form:FormGroup):void{

  this._AuthService.verityCode(form.value).subscribe({
    next:(Response)=>{console.log(Response), this.msgSu = Response.message
    if(Response.status=='Success'){
this._Router.navigate(['/resetPassword'])
    }

    
    
    },
    error:(err)=>{console.log(err)}
  })
}







forgetPassword = new FormGroup({

email:new FormControl(),
  }
  )
  sendcode(form:FormGroup):void{
console.log(form)
this._AuthService.forgetPassword(form.value).subscribe({
  next:(Response)=>{
console.log(Response)
this.msgSuccess = Response.message
this.showForgetPassword = false;
this.showVerifyCode = true;

  },
  error:(err)=>{
    console.log(err)
  }
})
  }
}
