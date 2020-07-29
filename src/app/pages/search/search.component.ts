import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public products: Product[] = [];

  public searchProducts = [];
  public companyId=null;
  public productname:any='';
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public productService: ProductService, 
    private commonAPIServices: CommonAPIService) { 
      this.companyId=localStorage.getItem("cmp_id");

  }

  ngOnInit(): void {
    this.companyId=localStorage.getItem("cmp_id");
  }

  
  loadsearchProducts() {
    this.spinner.show();
    const formData = new FormData();
    formData.append('cmp_id', this.companyId);
    formData.append('name', this.productname);
    this.commonAPIServices.productSearch(formData).subscribe(resp => {
      this.spinner.hide();
      if (resp && resp.data && resp.data.length > 0) {
        this.searchProducts = resp.data;
      }
      else {        
        this.searchProducts=[];
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
  
  showSuccess(msg) {
    this.toastr.success(msg);
  }  
  showError(msg) {
    this.toastr.error(msg);
  }

}
