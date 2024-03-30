import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }
userData:any;
LogOut():void
{
localStorage.removeItem('eToken');
this._Router.navigate(['/login']);
}
saveUserData(){
  if (localStorage.getItem('eToken') != null)
  {
    let encodeToken:any = localStorage.getItem('eToken');
    let decode =  jwtDecode(encodeToken)
    this.userData = decode;
    console.log(decode)
  }

}

setRegister(userData:Object):Observable<any>{
 return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
}
setLogin(userData:Object):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
 }
 forgetPassword(userData:Object):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', userData)
 }
 verityCode(userData:Object):Observable<any>{
  return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', userData)
 }
 resetPassword(userData:Object):Observable<any>{
  return this._HttpClient.put( 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword', userData)
 }



}
