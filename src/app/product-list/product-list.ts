import {
  Component,
  inject,
  signal,
  computed,
  OnInit
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

import { Category } from '../models/category';
import { Product } from '../models/products';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class UserProductList implements OnInit {

  private http = inject(HttpClient);


  // =====================================================
  // API URL'LERİ
  // =====================================================

  private readonly apiUrlProducts =
    'https://localhost:7000/api/Products';

  private readonly apiUrlCategories =
    'https://localhost:7000/api/Categories';


  // =====================================================
  // TÜM ÜRÜNLER
  // =====================================================

  private allProducts = signal<Product[]>([]);


  // =====================================================
  // KATEGORİLER
  // =====================================================

  categories = toSignal(
    this.http.get<Category[]>(this.apiUrlCategories),
    {
      initialValue: []
    }
  );


  // =====================================================
  // FİLTRE STATE'LERİ
  // =====================================================

  selectedCategoryId = signal<number>(0);

  /*
   * Kullanıcının seçtiği maksimum fiyat.
   *
   * Ürünler API'den geldikten sonra otomatik olarak
   * en yüksek ürün fiyatına ayarlanacak.
   */
  maxPrice = signal<number>(0);

  selectedSort = signal<string>('default');


  // =====================================================
  // API'DEKİ EN YÜKSEK ÜRÜN FİYATI
  // =====================================================

  maxAvailablePrice = computed(() => {

    const products = this.allProducts();

    if (products.length === 0) {
      return 0;
    }


    const prices = products.map(product =>
      this.parsePrice(product.price)
    );


    const highestPrice = Math.max(...prices);


    /*
     * Slider 50'şer TL ilerlediği için
     * maksimum değeri 50'nin katına yuvarlıyoruz.
     *
     * Örneğin:
     *
     * 1270 → 1300
     * 1240 → 1250
     * 1300 → 1300
     */
    return Math.ceil(highestPrice / 50) * 50;

  });


  // =====================================================
  // FİYAT PARSE
  // =====================================================

  private parsePrice(
    price: number | string | null | undefined
  ): number {

    if (
      price === null ||
      price === undefined
    ) {
      return 0;
    }


    // Eğer API number gönderiyorsa
    if (typeof price === 'number') {
      return price;
    }


    let value = String(price)
      .trim()
      .replace(/\s/g, '')
      .replace(/TL/gi, '');


    /*
     * Örnek:
     *
     * 1.200,50
     *
     * → 1200.50
     */

    if (
      value.includes('.') &&
      value.includes(',')
    ) {

      value = value
        .replace(/\./g, '')
        .replace(',', '.');

      return Number(value);
    }


    /*
     * Örnek:
     *
     * 1200,50
     *
     * → 1200.50
     */

    if (value.includes(',')) {

      return Number(
        value.replace(',', '.')
      );

    }


    /*
     * Türkçe binlik format:
     *
     * 1.200
     * 1.300
     * 10.000
     *
     * Bunları 1200 / 1300 / 10000
     * olarak değerlendiriyoruz.
     */

    if (value.includes('.')) {

      const parts = value.split('.');


      if (
        parts.length === 2 &&
        parts[1].length === 3
      ) {

        return Number(
          parts[0] + parts[1]
        );

      }

    }


    return Number(value);

  }


  // =====================================================
  // FİLTRELENMİŞ ÜRÜNLER
  // =====================================================

  filteredProducts = computed<Product[]>(() => {

    const products = this.allProducts();

    const categoryId =
      this.selectedCategoryId();

    const priceLimit =
      this.maxPrice();

    const sortType =
      this.selectedSort();


    // ===================================================
    // FİLTRELE
    // ===================================================

    let result = products.filter(product => {

      const productPrice =
        this.parsePrice(product.price);


      const productCategoryId =
        Number(product.categoryId);


      const matchesCategory =
        categoryId === 0 ||
        productCategoryId === categoryId;


      const matchesPrice =
        productPrice <= priceLimit;


      return (
        matchesCategory &&
        matchesPrice
      );

    });


    // ===================================================
    // SIRALA
    // ===================================================

    switch (sortType) {

      case 'low-high':

        result = [...result].sort(
          (a, b) =>
            this.parsePrice(a.price) -
            this.parsePrice(b.price)
        );

        break;


      case 'high-low':

        result = [...result].sort(
          (a, b) =>
            this.parsePrice(b.price) -
            this.parsePrice(a.price)
        );

        break;


      case 'name':

        result = [...result].sort(
          (a, b) =>
            a.name.localeCompare(
              b.name,
              'tr',
              {
                sensitivity: 'base'
              }
            )
        );

        break;


      case 'default':
      default:
        break;

    }


    return result;

  });


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadProducts();

  }


  // =====================================================
  // ÜRÜNLERİ GETİR
  // =====================================================

  loadProducts(): void {

    this.http
      .get<Product[]>(this.apiUrlProducts)
      .subscribe({

        next: (data) => {

          // Ürünleri kaydet
          this.allProducts.set(data);


          // ---------------------------------------------
          // API'deki EN YÜKSEK FİYATI BUL
          // ---------------------------------------------

          if (data.length > 0) {

            const prices = data.map(product =>
              this.parsePrice(product.price)
            );


            const highestPrice =
              Math.max(...prices);


            /*
             * Slider 50'şer ilerlediği için
             * en yüksek fiyatı 50'nin katına çıkarıyoruz.
             */

            const dynamicMaxPrice =
              Math.ceil(
                highestPrice / 50
              ) * 50;


            /*
             * Slider başlangıçta tüm ürünleri
             * gösterecek.
             */

            this.maxPrice.set(
              dynamicMaxPrice
            );

          }

        },

        error: (error) => {

          console.error(
            'Ürünler yüklenirken hata oluştu:',
            error
          );

        }

      });

  }


  // =====================================================
  // KATEGORİ DEĞİŞTİ
  // =====================================================

  onCategoryChange(event: Event): void {

    const select =
      event.target as HTMLSelectElement;


    this.selectedCategoryId.set(
      Number(select.value)
    );

  }


  // =====================================================
  // FİYAT DEĞİŞTİ
  // =====================================================

  onPriceChange(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    this.maxPrice.set(
      Number(input.value)
    );

  }


  // =====================================================
  // SIRALAMA DEĞİŞTİ
  // =====================================================

  onSortChange(event: Event): void {

    const select =
      event.target as HTMLSelectElement;


    this.selectedSort.set(
      select.value
    );

  }


  // =====================================================
  // FİLTRELERİ TEMİZLE
  // =====================================================

  clearFilters(): void {

    this.selectedCategoryId.set(0);

    /*
     * Temizle dediğinde sabit 10.000 değil,
     * API'deki gerçek maksimum fiyata dön.
     */
    this.maxPrice.set(
      this.maxAvailablePrice()
    );

    this.selectedSort.set('default');

  }

}
