import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{
  constructor(private _AuthService:AuthService , private _Router:Router , private _CartService:CartService , private _WishlistService:WishlistService){}

cartNum:number  = 0;
WishNum:number  = 0;

navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

logOutUser():void{
  this._AuthService.LogOut();
}
ngOnInit(): void {
  
  // cart
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartNum = data 
      }
    })

// wish list 
this._WishlistService.WishNumber.subscribe({
  next:(data)=>{
    this.WishNum = data 

  }

})

this._CartService.getUserCart().subscribe({
  next:(Response)=>{
    this.cartNum = Response.numOfCartItems
  }
})


this._WishlistService.getWishlist().subscribe({
  next:(Response)=>{
    this.WishNum = Response.data.length
  }
})



}
}
