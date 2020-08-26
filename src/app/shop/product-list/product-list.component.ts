import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../shared/services/product.service";
import { Product } from '../../shared/classes/product';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: Product[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 10000;
  public tags: any[] = [];
  public category: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;
  public userCred:any;
  
  public categoryList = [];
  currentId:any=0;
  categoryName='';
  constructor(private route: ActivatedRoute, private router: Router,
    private viewScroller: ViewportScroller, public productService: ProductService,private commonAPIServices: CommonAPIService) { 
      localStorage.setItem("slugID",this.route.snapshot.params.slug);
      if(localStorage.getItem("slugID")=='undefined'){
        console.log('not found category');
      }
      else{
        this.refresh();
        /*
        // Get Query params..
        this.route.queryParams.subscribe(params => {
          this.brands = params.brand ? params.brand.split(",") : [];
          this.colors = params.color ? params.color.split(",") : [];
          this.size  = params.size ? params.size.split(",")  : [];
          this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
          this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
          this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array
          
          this.category = params.category ? params.category : null;
          this.sortBy = params.sortBy ? params.sortBy : 'ascending';
          this.pageNo = params.page ? params.page : this.pageNo;

          // Get Filtered Products..
          this.productService.filterProducts(this.tags).subscribe(response => {         
            // Sorting Filter
            this.products = this.productService.sortProducts(response, this.sortBy);
            // Category Filter
            if(params.category)
              this.products = this.products.filter(item => item.type == this.category);
            // Price Filter
            this.products = this.products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice) 
            // Paginate Products
            this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
            this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
          })
        })    
        */    
      }
      
      this.categoryName='';
  }

  ngOnInit(): void {      
    this.categoryName='';
    localStorage.setItem("slugID",this.route.snapshot.params.slug);
    // console.log('OnInit pl : ' +localStorage.getItem("slugID"));
    if(localStorage.getItem("slugID")=='undefined'){
      // console.log('ngOnInit not found category');
    }
    else{
      this.refresh();  
    }
    this.currentId=localStorage.getItem("slugID");
    this.getCategoryList();
  }

  
  getCategoryList() {    
		let companyId=localStorage.getItem("cmp_id");
    const formData = new FormData();
    formData.append('cmp_id', companyId);
    this.commonAPIServices.fetchCategoryList(formData).subscribe(result => {
      this.categoryList=result.data;
    })
  }

  refresh(){ 
    if(localStorage.getItem("slugID")){
      localStorage.removeItem("slugID");
    }   
    localStorage.setItem("slugID",this.route.snapshot.params.slug);
    this.route.queryParams.subscribe(params => {
      this.brands = params.brand ? params.brand.split(",") : [];
      this.colors = params.color ? params.color.split(",") : [];
      this.size  = params.size ? params.size.split(",")  : [];
      this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
      this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
      this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array
      
      this.category = params.category ? params.category : null;
      this.sortBy = params.sortBy ? params.sortBy : 'ascending';
      this.pageNo = params.page ? params.page : this.pageNo;

      // Get Filtered Products..
      this.productService.filterProducts(this.tags).subscribe(response => {         
        // Sorting Filter
        this.products = this.productService.sortProducts(response, this.sortBy);
        // Category Filter
        if(params.category)
          this.products = this.products.filter(item => item.type == this.category);
        // Price Filter
        this.products = this.products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice) 
        // Paginate Products
        this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
        this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
      })
    })
  }

  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {
  
    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag );

    let params = { 
      brand: this.brands.length ? this.brands.join(",") : null, 
      color: this.colors.length ? this.colors.join(",") : null, 
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if(value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  // next category

  nextcategory(id,name){    
    this.categoryName=name;
    this.currentId=id;
    localStorage.setItem("slugID",id);
    this.router.navigate(['/shop/productList/left/sidebar/',id]);
    this.refresh();
  }

}
