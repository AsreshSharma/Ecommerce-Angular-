import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  public offer:any='';
  public offer_id:any='0';
  constructor(private route: ActivatedRoute, private router: Router,private toastr: ToastrService,private spinner: NgxSpinnerService,private commonAPIServices: CommonAPIService) { 
    this.offer_id=this.route.snapshot.params.slug;
    this.getoffer_detail();
  }

  ngOnInit(): void {
    this.offer_id=this.route.snapshot.params.slug;
    this.getoffer_detail();
  }

  getoffer_detail() {
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', this.offer_id);
    this.commonAPIServices.fetchOfferdetail(formData).subscribe(result => {
      this.spinner.hide();
      if (result.status=='1') {
        this.offer = result.data;
      }
      else{        
        this.showError(result.msg);
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
