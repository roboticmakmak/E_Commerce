import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/data/ecomdata.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit{
constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService){}
BrandID:string|null = '';
BrandDetails:Brand = {} as Brand;  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{this.BrandID = params.get('id')}
    }
    )
    this._EcomdataService.getBrandDetails(this.BrandID).subscribe({
      next: (response) => {
        console.log(response.data)
        this.BrandDetails = response.data
      }
    })
  }
}
