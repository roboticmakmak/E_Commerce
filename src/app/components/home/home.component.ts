import { CartService } from './../../shared/services/cart.service';
import { Subcategory, Category } from './../../shared/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/data/ecomdata.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
constructor(private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService 
  , private _Renderer2:Renderer2
  , private _WishlistService:WishlistService
  
  )
{

}
product:Product[] = []
Categories:any[] = []
wishListData:string[] = [];
searchTerm:string = ''
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
MainOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}
ngOnInit(): void {
    this._EcomdataService.getAllProduct().subscribe({
      next: (response) => {
this.product = response.data      }
     });
     this._EcomdataService.GetCategories().subscribe({
      next:(response)=>{
      this.Categories = response.data;
      }
     })
     this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        const newData = response.data.map( (item:any)=>item._id );
        this.wishListData = newData;
        }
     })
}
addCart(id:string , element:HTMLButtonElement):void{

this._Renderer2.setAttribute(element,'disabled','true')



this._CartService.addToCart(id).subscribe({
next:(Response)=>{console.log(Response); this._ToastrService.success(Response.message , 'Fresh Cart') ,this._Renderer2.removeAttribute(element,'disabled'), 
this._CartService.cartNumber.next(Response.numOfCartItems)

},
error:(err)=>{
console.log(err); this._ToastrService.error(err.message , 'Fresh Cart')
this._Renderer2.removeAttribute(element,'disabled')
}
}

)
}
AddFav(prodId:string|undefined):void{
  this._WishlistService.addToWishlist(prodId).subscribe({
    next:(Response)=>{
      this._ToastrService.success(Response.message);
      this.wishListData = Response.data;
      this._WishlistService.WishNumber.next(Response.data.length)

    }


  })
}
RemoveFav(id:string):void{
  this._WishlistService.RemoveWishlist(id).subscribe({
   next:(response)=>{
     console.log(response)
     this._ToastrService.success(response.message)
     this.wishListData = response.data;
   }
  })
}
}
