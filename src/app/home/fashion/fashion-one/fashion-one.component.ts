import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public productCollections: any[] = [];

  public sliders = []
  public offersList = [];
  public companyId = null;
  public featureProducts = [];
  public categoryList = [];

  public base_url='';
  constructor(private router: Router,private toastr: ToastrService,private spinner: NgxSpinnerService,public productService: ProductService, private commonAPIServices: CommonAPIService) {
    this.base_url=location.origin;        
    // if(localStorage.getItem("cmp_id")==undefined || localStorage.getItem("cmp_id")==undefined==null){
    //   this.checkwebsite();  
    // }  
    this.companyId=localStorage.getItem("cmp_id");
    this.getCategoryList();    
    this.loadBanners();
    this.fetchOffers();
    this.loadFeatureProducts();  
  }
  
  ngOnInit(): void {   
    if(localStorage.getItem("cmp_id")==undefined || localStorage.getItem("cmp_id")==null){
      console.log('cmp id not found');
      this.checkwebsite();  
    }
    else{
      if(this.products==undefined || this.products==null || this.products.length == 0){   
        this.getProductsList();
      } 
    }
  }

  productsearch() {
    this.router.navigate(['/pages/search']);
  }
  
  checkwebsite(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('search_url', this.base_url);
    this.commonAPIServices.searchwebsite(formData).subscribe(resp => {
      this.spinner.hide();
      if(resp && resp.status == 1 && resp.data) {                
        if(resp.data.getStatus=='1'){          
          this.router.navigate(['/pages/404']);
        }
        else{ 
          this.companyId=resp.data.cmp_id;        
          localStorage.setItem("cmp_id", resp.data.cmp_id);
          localStorage.setItem("logo", resp.data.logo);  
          localStorage.setItem("mobile", resp.data.mobile);  
          localStorage.setItem("title", resp.data.title);       
          this.loadBanners();
          this.fetchOffers();
          this.loadFeatureProducts();  
          this.getCategoryList();  
          this.getProductsList();
        }
      } 
      else {        
        this.showError(resp.msg);
      }
    },
    err => {      
      this.spinner.hide();
      this.showError(err);
    },
    () => {
      this.spinner.hide();
      // this.showError('Complete function triggered.');
    });
  }
  

  getCategoryList() {
    const formData = new FormData();//946
    formData.append('cmp_id', this.companyId);
    this.commonAPIServices.fetchCategoryList(formData).subscribe(result => {
      if (result && result.data && result.data.length > 0) {
        this.categoryList = result.data;
      }
    })
  }

  loadBanners() {
    const formData = new FormData();//946
    formData.append('cmp_id', this.companyId);
    this.commonAPIServices.fetchBanners(formData).subscribe(result => {
      if (result && result.data && result.data.length > 0) {
        result.data.forEach(element => {
          let banner = {
            title: "",
            subTitle: "",
            image: element.image
          }
          this.sliders.push(banner);
        });
      }
    })
  }

  fetchOffers() {
    const formData = new FormData();//946
    formData.append('cmp_id', this.companyId);
    this.commonAPIServices.fetchOffers(formData).subscribe(result => {
      if (result && result.data && result.data.length > 0) {
        this.offersList = result.data;
      }
    })
  }

  loadFeatureProducts() {
    const formData = new FormData();
    formData.append('cmp_id', this.companyId);
    this.commonAPIServices.fetchFeatureProducts(formData).subscribe(resp => {
      if (resp && resp.data && resp.data.length > 0) {
        this.featureProducts = resp.data;
        // this.productMapper(resp.data.slice(0, 8));
      }
    });

  }




  productMapper(rawProductList){  
    rawProductList.forEach(product => {
      let productObject =   {
        "id": product.product_id,
        "title": "product_name",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
        "type": "fashion",
        "brand": "nike",
        "collection": ["new products"],
        "category": "Women",
        "price": "988",
        "sale": true,
        "discount": "40",
        "stock": 1,
        "new": true,
        "tags": ["new", "s", "m", "yellow", "white", "pink", "nike"],
        "variants": [{
          "variant_id": 101,
          "id": 1,
          "sku": "sku1",
          "size": "s",
          "color": "yellow",
          "image_id": 111
        }],
        "images": [{
          "image_id": 111,
          "id": 1,
          "alt": "yellow",
          "src": product.img,
          "variant_id": [101]
        }]
      }
      this.featureProducts.push(productObject);
    });
  }

  getProductsList() {

    this.productService.allgetProducts.subscribe(response => {
      this.products=response.filter(item=>item.type=='fashion');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  public ProductSliderConfig: any = ProductSlider;



  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'women'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];


  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

  
  showSuccess(msg) {
    this.toastr.success(msg);
  }  
  showError(msg) {
    this.toastr.error(msg);
  }

}
