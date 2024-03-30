import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/data/ecomdata.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product[] = [];
  pageSize: number = 0;
  curentPage: number = 0;
  total: number = 0;

  constructor(
    private _EcomdataService: EcomdataService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._EcomdataService.getAllProduct().subscribe({
      next: (response) => {
        this.product = response.data;
        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;
      }
    });
  }

  pageChanged(event: any): void {
    this._EcomdataService.getAllProduct(event).subscribe({
      next: (response) => {
        this.product = response.data;
        this.pageSize = response.metadata.limit;
        this.curentPage = response.metadata.currentPage;
        this.total = response.results;
      }
    });
  }

  addCart(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (Response: { message: any }) => {
        console.log(Response);
        this._ToastrService.success(Response.message, 'Fresh Cart');
        this._Renderer2.removeAttribute(element, 'disabled');
      },
      error: (err: { message: any }) => {
        console.log(err);
        this._ToastrService.error(err.message, 'Fresh Cart');
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    });
  }
}
