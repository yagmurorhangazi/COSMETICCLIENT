import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './admin-components/product-list/product-list';
import { CategoryList } from './admin-components/category-list/category-list';
import { CategoryUpdate } from './admin-components/category-update/category-update';
import { CategoryCreate } from './admin-components/category-create/category-create';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './main-components/home/home';
import { ProductCreate } from './admin-components/product-create/product-create';

const routes: Routes = [

//Admin ROTASI
{path : 'admin', component : AdminLayout,children:[

{path : 'products' , component : ProductList},
{path : 'products/create' , component : ProductCreate},
{path : 'categories', component : CategoryList},
{path : 'categories/update/:id', component : CategoryUpdate},
{path : 'categories/create', component : CategoryCreate}
]},

//Main Routes
{path:'',component:MainLayout,children:[

  { path: '', component: Home },


]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
