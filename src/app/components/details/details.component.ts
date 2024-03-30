import { Product } from './../../shared/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/data/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

constructor(private _ActivatedRoute:ActivatedRoute, private _EcomdataService:EcomdataService , private _Renderer2:Renderer2 , private _CartService:CartService , private _ToastrService:ToastrService){

}
ProductDetails:Product = {} as Product;
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
      this._ActivatedRoute.paramMap.subscribe({
        next:(params) =>{
          let idProduct:any = params.get('id')
          this._EcomdataService.getProductDetails(idProduct).subscribe({
            next:(response)=>{
           this.ProductDetails = response.data;
          
           }
          })
        }




      })
  }
  addCart(id:string , element:HTMLButtonElement):void{

    this._Renderer2.setAttribute(element,'disabled','true')
    
    
    
    this._CartService.addToCart(id).subscribe({
    next:(Response)=>{console.log(Response); this._ToastrService.success(Response.message , 'Fresh Cart') ,this._Renderer2.removeAttribute(element,'disabled')
    },
    error:(err)=>{
    console.log(err); this._ToastrService.error(err.message , 'Fresh Cart')
    this._Renderer2.removeAttribute(element,'disabled')
    }
    }
    
    )
    }
}
