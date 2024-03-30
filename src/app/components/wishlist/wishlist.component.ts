import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/data/ecomdata.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  Products: Product[] = [];
  wishListData:string[] = [];

  constructor(
    private _WishlistService: WishlistService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _EcomdataService: EcomdataService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (response) => {
        this.Products = response.data;
      }
    });
    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        const newData = response.data.map( (item:any)=>item._id );
        this.wishListData = newData;

        }
     })




  }

  AddFav(prodId:string|undefined):void{
    this._WishlistService.addToWishlist(prodId).subscribe({
      next:(Response)=>{
        console.log(Response)
        this._ToastrService.success(Response.message);
        this.wishListData = Response.data;
      }
  
  
    })
  }

  addCart(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (Response) => {
        console.log(Response);
        this._ToastrService.success(Response.message, 'Fresh Cart');
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.message, 'Fresh Cart');
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    });
  }
  RemoveFav(id:string):void{
    this._WishlistService.RemoveWishlist(id).subscribe({
     next:(response)=>{
       console.log(response)
       this._ToastrService.success(response.message)
       this.wishListData = response.data;


       this._WishlistService.getWishlist().subscribe({
        next:(response)=>{
          this.Products = response.data;
        }
       })
     }
    })
  }
}
