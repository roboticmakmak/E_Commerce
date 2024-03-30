import { Subcategory } from './../../shared/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
constructor(private _CartService:CartService , private _Renderer2:Renderer2 , private router: Router){}
  
cartDetails:any = null;



  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
        this.cartDetails = response.data 
        },
        error:(err)=>{
console.log(err)
        }
      })
  }
  removeCartItem(id:string){
    this._CartService.removeItem(id).subscribe({
      next:(response)=>{
        this.cartDetails = response.data 
      },
        error:(err)=>{
console.log(err)
        }
      })
  }
  clear():void{
this._CartService.removeAll().subscribe(
  {
    next:(Response)=>{
      
      
      console.log(Response),this.cartDetails = null; 
    }
    
  },

)
  }
  goToHome() {
    this.router.navigateByUrl('/home');
}
  changeCount(id:string , count:number , el1:HTMLButtonElement , el2:HTMLButtonElement):void{
if(count > 0){
  this._Renderer2.setAttribute(el1,'disabled','true'),
  this._Renderer2.setAttribute(el2,'disabled','true')

  this._CartService.updateCartProduct(id,count).subscribe({
    next:(response)=>{
      this.cartDetails = response.data;
      this._Renderer2.removeAttribute(el1,'disabled')
      this._Renderer2.removeAttribute(el2,'disabled')


    },
      error:(err)=>{ this._Renderer2.removeAttribute(el1,'disabled')
      this._Renderer2.removeAttribute(el2,'disabled')
      }
  
  
  
  })
}

 }
}
