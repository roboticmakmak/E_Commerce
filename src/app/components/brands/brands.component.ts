import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/data/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
constructor(private _EcomdataService:EcomdataService){}
    _brands:Brand[] = []

ngOnInit(): void {
    this._EcomdataService.getBrand().subscribe({
      next:(response)=>{
        this._brands = response.data;
      }
    })
  }
}
