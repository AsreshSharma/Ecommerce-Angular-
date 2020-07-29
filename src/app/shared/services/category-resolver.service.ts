import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Product } from '../classes/product';
import { ProductService } from './product.service';

@Injectable({
	providedIn: 'root'
})
export class CategoryResolver implements Resolve<Product> {
  
  public productList : Product[] = [];

  constructor(
    private router: Router,
    public productService: ProductService
  ) {}

  // Resolver
  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    //debugger;
    await new Promise(resolve => setTimeout(resolve, 1000));    
    this.productService.getProductListBySlug(route.params.slug).subscribe(productList => {
      if(!productList) { // When product is empty redirect 404
          this.router.navigateByUrl('/pages/404', {skipLocationChange: true});
      } else {
         return productList
      }
    })
    return this.productList;
  }
}
