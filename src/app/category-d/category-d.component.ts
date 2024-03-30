import { Category } from './../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from '../shared/services/data/ecomdata.service';

@Component({
  selector: 'app-category-d',
  templateUrl: './category-d.component.html',
  styleUrls: ['./category-d.component.css']
})
export class CategoryDComponent implements OnInit{
constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService){}
categoryID:string|null = '';
CategoryDetails:Category = {} as Category;  
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{this.categoryID = params.get('id')}
      }
      )

      this._EcomdataService.GetCategoryDetails(this.categoryID).subscribe({
        next: (response) => {
          this.CategoryDetails = response.data
        }
      
      
      })
}
}
