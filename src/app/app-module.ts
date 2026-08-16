import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './admin-components/products/product-list/product-list';
import { CategoryList } from './admin-components/categories/category-list/category-list';
import { CategoryUpdate } from './admin-components/categories/category-update/category-update';
import { CategoryCreate } from './admin-components/categories/category-create/category-create';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './main-components/home/home';
import { MainAbout } from './main-components/main-about/main-about';
import { MainProduct } from './main-components/main-product/main-product';
import { MainContact } from './main-components/main-contact/main-contact';
import { MainBanner } from './main-components/main-banner/main-banner';
import { MainTestimonial } from './main-components/main-testimonial/main-testimonial';
import { ProductCreate } from './admin-components/products/product-create/product-create';
import { ProductUpdate } from './admin-components/products/product-update/product-update';
import { TestimonialList } from './admin-components/Testimonials/testimonial-list/testimonial-list';
import { UserProductList } from './product-list/product-list';

@NgModule({
  declarations: [
    App,
    ProductList,
    CategoryList,
    CategoryUpdate,
    CategoryCreate,
    AdminLayout,
    MainLayout,
    Home,
    MainAbout,
    MainProduct,
    MainContact,
    MainBanner,
    MainTestimonial,
    ProductCreate,
    ProductUpdate,
    TestimonialList,
    UserProductList,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
