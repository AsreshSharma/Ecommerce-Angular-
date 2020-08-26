import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { CommonAPIService } from '../../services/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public products: Product[] = [];
  public collapse: boolean = true;
  public categoryList = [];
  public companyId;
  constructor( private commonAPIServices: CommonAPIService,
    private router: Router, ) { 
		this.companyId=localStorage.getItem("cmp_id");
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {    
    // let cred=JSON.parse(localStorage.getItem("userInfo")); 
		this.companyId=localStorage.getItem("cmp_id");
    const formData = new FormData();
    formData.append('cmp_id', this.companyId);
    this.commonAPIServices.fetchCategoryList(formData).subscribe(result => {
      this.categoryList = result.data;
      // localStorage.setItem("categoryId","3690");
    })
  }

  categoryRoute(id){        
    localStorage.setItem("slugID",id);
    this.router.navigate(['/shop/productList/left/sidebar/',id]);
  }

  public isActive(catid){
    let getid=localStorage.getItem("slugID");
    if(getid==catid){
      return 'activecat';
    }
  }
  

}
