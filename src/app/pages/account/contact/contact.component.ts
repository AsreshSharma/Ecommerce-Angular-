import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public cmpInfo={
    name:'',
    email:'',
    logo:'',
    mobile:'',
    youtube:'',
    term_condition:'',
    twitter:'',
    website:'',
    facebook:'',
    id:'',
    state:'',
    city:'',
    address:'',
    iframe:''
  };
  result: any;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router, 
    private commonAPIService: CommonAPIService,
    private toastr: ToastrService,
    private sanitized: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getdetails();
  }

  // getCompanyDetails
  getdetails(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('cmp_id', localStorage.getItem("cmp_id"));
    this.commonAPIService.getCompanyDetails(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.cmpInfo.name=resp.data.name;
          this.cmpInfo.email=resp.data.email;
          this.cmpInfo.logo=resp.data.logo;
          this.cmpInfo.mobile=resp.data.mobile;
          this.cmpInfo.youtube=resp.data.youtube;
          this.cmpInfo.term_condition=resp.data.term_condition;
          this.cmpInfo.twitter=resp.data.twitter;
          this.cmpInfo.website=resp.data.website;
          this.cmpInfo.facebook=resp.data.facebook;
          this.cmpInfo.id=resp.data.id;
          this.cmpInfo.state=resp.data.state;
          this.cmpInfo.city=resp.data.city;
          this.cmpInfo.address=resp.data.address;
          this.cmpInfo.iframe=resp.data.iframe;      
          this.result=this.sanitized.bypassSecurityTrustHtml(resp.data.iframe);    
    
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
      }
    );
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }  
  showError(msg) {
    this.toastr.error(msg);
  }

}
