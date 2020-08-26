import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CommonAPIService } from '../../services/common-api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { BrowserModule, Title,Meta } from '@angular/platform-browser';

import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;
  company : any = {}

  public isLogin='';  
  public products: Product[] = [];
  public logo='';
  public mobile='';
  public search:any='';
  public base_url='';
  constructor(private messagingService: MessagingService,
    private title:Title,    
    private metaTagService: Meta,
    private router: Router, 
    private commonApiServices: CommonAPIService, 
    public productService: ProductService) { 
    this.base_url=location.origin; 
    if(localStorage.getItem("cmp_id")==undefined || localStorage.getItem("cmp_id")==undefined==null){
      this.checkwebsite();  
    } 
    else{
      this.logo=localStorage.getItem("logo");      
      this.mobile=localStorage.getItem("mobile");
    }

    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    this.base_url=location.origin; 
    
		// let cred=JSON.parse(localStorage.getItem("userInfo")); 
    let cmp_id=localStorage.getItem("cmp_id");    
    if(localStorage.getItem("cmp_id")==undefined || localStorage.getItem("cmp_id")==undefined==null){
      this.checkwebsite();  
    } 
    else{
      this.logo=localStorage.getItem("logo");      
      this.mobile=localStorage.getItem("mobile");
    }

    if(localStorage.getItem("userInfo")){
      this.isLogin='true';
    }
    else{
      this.isLogin='';
    }

    if(localStorage.getItem("title")!=undefined || localStorage.getItem("title")!=null){
      this.title.setTitle(localStorage.getItem("title"));   
    } 

    if(localStorage.getItem("meta_description")!=undefined || localStorage.getItem("meta_description")!=null){
      this.metaTagService.updateTag(
        {name: 'description', content: localStorage.getItem("meta_description")}
      );      
    }

    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.messagingService.currentMessage; 
  }
  
  productsearch() {
    localStorage.setItem('searchproduct',this.search);
    this.router.navigate(['/pages/search']);
  }
  
  checkwebsite(){
    const formData = new FormData();
    formData.append('search_url', this.base_url);
    this.commonApiServices.searchwebsite(formData).subscribe(resp => {
      if(resp && resp.status == 1 && resp.data) {         
        if(resp.data.getStatus=='1'){          
          this.router.navigate(['/pages/404']);
        }
        else{ 
          localStorage.setItem("cmp_id", resp.data.cmp_id);
          localStorage.setItem("logo", resp.data.logo);   
          localStorage.setItem("mobile", resp.data.mobile);  
          localStorage.setItem("title", resp.data.title); 
          localStorage.setItem("meta_description", resp.data.meta_description); 
          this.logo=resp.data.logo;
          this.mobile=resp.data.mobile;
        }
      } 
    },
    err => {      
      console.log(err);
    },
    () => {
    });
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 300 && window.innerWidth > 400) { 
  	  this.stick = true;
    } 
    else {
  	  this.stick = false;
  	}
  }

  getCompanyDetails(companyId) {
    const formData = new FormData();
    formData.append('cmp_id', companyId);
    this.commonApiServices.getCompanyDetails(formData).subscribe(result => {
      if (result && result.data) {
        this.company = result.data;
      }
    })

  }

  logout(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    // localStorage.clear();
    this.router.navigate(['/pages/login']);
  }
  

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

  
  order(){
    localStorage.setItem('setStatus','2');   
    this.router.navigate(['pages/dashboard']);
  }

  profile(){
    localStorage.setItem('setStatus','0');   
    this.router.navigate(['pages/profile']);
  }


}
