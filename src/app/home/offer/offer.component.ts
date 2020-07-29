import { Component, OnInit } from '@angular/core';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  public offersList = [];
  public companyId='0';
  constructor(private toastr: ToastrService,private spinner: NgxSpinnerService,private commonAPIServices: CommonAPIService) {
    this.companyId=localStorage.getItem("cmp_id");
  }

  ngOnInit(): void {
    this.fetchOffers();
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

}
