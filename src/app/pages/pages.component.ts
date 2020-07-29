import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isLoggedIn = false;

  public url: any;

  public base_url='';
  constructor(private router: Router,private spinner: NgxSpinnerService,private commonAPIService: CommonAPIService,
    private toastr: ToastrService) {
      
    this.base_url=location.origin;    
    // this.base_url="https://greenandgrains.com"; 
    this.router.events.subscribe((event) => {  
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });

  }

  ngOnInit(): void {   
    this.base_url=location.origin;   
    // this.base_url="https://greenandgrains.com"; 
    if(localStorage.getItem("cmp_id")==undefined || localStorage.getItem("cmp_id")==null){
      this.checkwebsite();  
    }
  }
  
  checkwebsite(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('search_url', this.base_url);
    this.commonAPIService.searchwebsite(formData).subscribe(resp => {
      this.spinner.hide();
      if(resp && resp.status == 1 && resp.data) {
        if(resp.data.getStatus=='1'){          
          this.router.navigate(['/pages/404']);
        }
        else{
          localStorage.setItem("cmp_id", resp.data.cmp_id);
          localStorage.setItem("logo", resp.data.logo);
          localStorage.setItem("mobile", resp.data.mobile);  
          localStorage.setItem("title", resp.data.title); 
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
      // this.showError('Complete function triggered.');
    });
  }
  
  showSuccess(msg) {
    this.toastr.success(msg);
  }  
  showError(msg) {
    this.toastr.error(msg);
  }

  checklogin(){    
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn && "Y" == isLoggedIn) {
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
      // localStorage.clear();
    }
  }

}
