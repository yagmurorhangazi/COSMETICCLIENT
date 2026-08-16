import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. KULLANICI SAYFASI (Doğrudan app/product-list altında)
import { UserProductList as UserProductList } from './product-list/product-list';

// 2. ADMİN SAYFALARI (Klasör isimlerindeki büyük/küçük harf duyarlılığına göre tam uyumlu)
import { ProductList as AdminProductList } from './admin-components/products/product-list/product-list';
import { ProductCreate } from './admin-components/products/product-create/product-create';
import { ProductUpdate } from './admin-components/products/product-update/product-update';

import { CategoryList } from './admin-components/categories/category-list/category-list';
import { CategoryUpdate } from './admin-components/categories/category-update/category-update';
import { CategoryCreate } from './admin-components/categories/category-create/category-create';

import { TestimonialList } from './admin-components/Testimonials/testimonial-list/testimonial-list';

// LAYOUTS & MAIN COMPONENTS
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './main-components/home/home';

const routes: Routes = [
  // ADMİN PANELİ ROTASI
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'products', component: AdminProductList },
      { path: 'products/create', component: ProductCreate },
      { path: 'products/update/:id', component: ProductUpdate },
      { path: 'categories', component: CategoryList },
      { path: 'categories/update/:id', component: CategoryUpdate },
      { path: 'categories/create', component: CategoryCreate },
      { path: 'testimonials', component: TestimonialList }
    ]
  },

  // KULLANICI (SİTE) TARAFININ ROTASI
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'urunler', component: UserProductList }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
