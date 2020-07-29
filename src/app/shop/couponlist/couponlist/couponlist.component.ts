// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input,
  Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-couponlist',
  templateUrl: './couponlist.component.html',
  styleUrls: ['./couponlist.component.scss']
})
export class CouponlistComponent implements OnInit {
  @ViewChild("Couponlist", { static: false }) Couponlist: TemplateRef<any>;
  couponLists:any=[];
  public modalOpen: boolean = false;
  public closeResult: string;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router, private commonAPIServices: CommonAPIService,@Inject(PLATFORM_ID) private platformId: Object,private modalService: NgbModal) { 

    }

    ngOnInit(): void {
      this.couponlist();
    }

    couponlist(){
      this.spinner.show();
      let cmp_id = localStorage.getItem("cmp_id");
      const formData = new FormData();
      formData.append('cmp_id', cmp_id);
      this.commonAPIServices.fetchOffers(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data ) {
          this.couponLists = resp.data;
        } 
        else {
          this.couponLists=[];
          this.showError(resp.msg);
        }
      },
      err => {      
        this.spinner.hide();
        this.showError(err);
      },
      () => {
        this.spinner.hide();
        // console.log("Complete function triggered.")
      });
    }
  
    showSuccess(msg) {
      this.toastr.success(msg);
    }  
    showError(msg) {
      this.toastr.error(msg);
    }
}
