import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd  } from '@angular/router';
import { Location } from '@angular/common';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";

import { Title, Meta } from '@angular/platform-browser';

import 'rxjs/add/operator/filter'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  public geturlshare:any='';
  public mobile:any='';
  constructor(    
    private titleService: Title,
    private metaTagService: Meta,
    private route: ActivatedRoute, private router: Router,
    public productService: ProductService) { 
      this.route.data.subscribe(response => this.product = response.data );
      this.geturlshare=window.location.href;
      this.mobile=localStorage.getItem("mobile");
      
      this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => this.route)
        .map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .subscribe((event) => {

          this.metaTagService.addTag(
            {property: 'og:title', content: event.data.title }
          );
          
          this.metaTagService.addTag(
            {property: 'og:description', content: event.data.title }
          );
                    
          this.metaTagService.addTag(
            {property: 'og:type', content: 'Order' }
          );
          this.metaTagService.addTag(
            {property: 'og:image', content: event.data.img}
          );
          // console.log(event);
          // category,title,type,price
          this.titleService.setTitle(event.data.title);
          this.metaTagService.updateTag({ name: event.data.title, content:'<img src="'+ event.data.img +'" />'});
      });    
    }

  ngOnInit(): void {
    // console.log(this.product);
    this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => this.route)
        .map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .subscribe((event) => {
          this.metaTagService.updateTag(
            {property: 'og:title', content: event.data.title }
          );
          
          this.metaTagService.updateTag(
            {property: 'og:description', content: event.data.title }
          );
                    
          this.metaTagService.updateTag(
            {property: 'og:type', content: 'Order' }
          );
          this.metaTagService.updateTag(
            {property: 'og:image', content: event.data.img}
          );
          // console.log(event);
          // category,title,type,price
          this.titleService.setTitle(event.data.title);
          this.metaTagService.updateTag({ name: event.data.title, content:'<img src="'+ event.data.img +'" />'});
    });     
  }

  ngOnDestroy(): void {
    // console.log(this.titleService.getTitle());
    // console.log('Ondestroyed function call');
    this.titleService.setTitle('Online Store');
    // console.log(this.titleService.getTitle());
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }
  
  // Increament
  increment() {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  set_title(title){
    console.log(title);
    this.titleService.setTitle(title);
  }

  set_content(name1,description1){    
    console.log(name1 +' concate '+ description1);
    this.metaTagService.updateTag(
      { name: name1, content: description1 }
    );
  }

}
