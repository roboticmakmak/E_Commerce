import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailsComponent } from './components/details/details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CategoryDComponent } from './category-d/category-d.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
{
  
  path:"" ,
  canActivate:[authGuard],
  component:BlankLayoutComponent,
  children:[
    {path :'', redirectTo:"home", pathMatch:"full"},
    {path :'home', component:HomeComponent},
    {path :'brands', component:BrandsComponent},
    {path :'cart', component:CartComponent},
    {path :'details/:id', component:DetailsComponent},
    {path :'categories', component:CategoriesComponent},
    {path :'product', component:ProductComponent},
    {path :'allorders', component:AllordersComponent},
    {path :'wishlist', component:WishlistComponent},
    {path :'checkout/:id', component:CheckoutComponent},
    {path :'categoryDetails/:id', component:CategoryDComponent},
    {path :'brandDetails/:id', component:BrandDetailsComponent},


    



  ]


},
{path:"" , component:AuthLayoutComponent,
children:[
  {path :'login', component:LoginComponent},
  {path :'register', component:RegisterComponent},
  {path :'forgetPassword', component:ForgetPasswordComponent},
  {path :'resetPassword', component:ResetPasswordComponent},

 
]

},
{path:"**" , component:NotfoundComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
