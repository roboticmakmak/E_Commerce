import { Category } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/data/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
constructor(private _EcomdataService:EcomdataService){}
CategoryData:Category[] = []


  ngOnInit(): void {
        this._EcomdataService.GetCategories().subscribe({
          next:(response)=>{
            this.CategoryData = response.data
          },
          error:(err)=>{console.log(err)}
        })
  }
}
