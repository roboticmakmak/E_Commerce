import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

headers:any = {token:localStorage.getItem('eToken')}


  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)



  addToCart(productId:string):Observable<any>{
      return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
      { productId: productId}
      
      )
  }
  
  getUserCart():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }


  removeItem(Productid: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${Productid}` , 
  
    );
  }


  updateCartProduct(idProduct: string , newCount:number) : Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${idProduct}` , 
    {count:newCount}
    );
  }


  removeAll(): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` 
    
    );
  }


  checkout(cartId:string , userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{
      shippingAddress:userData
    })
  }
}
