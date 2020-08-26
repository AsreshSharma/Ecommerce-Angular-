import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileInfo:any;
  model = {
    wallet: "",
    name: "",
    mobile: "",
    email: "",
    city: "",
    address:"",
    dob:"",
    latitude:"",
    longitude:"",
    state:""
  }
  latitude:any;
  longitude:any;
  public userId=0;
  public cmpId=0;
  constructor(
    public productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router, 
    private commonAPIService: CommonAPIService,
    private toastr: ToastrService) {       
		let cred=JSON.parse(localStorage.getItem("userInfo")); 
    this.userId=cred.userId;
    this.cmpId=cred.companyId;
    // this.profile();    
    this.productService.getPosition().then(pos=>{
      this.latitude=pos.lat;
      this.longitude=pos.lng;
    });
  }

  ngOnInit(): void {
    this.productService.getPosition().then(pos=>{
      this.latitude=pos.lat;
      this.longitude=pos.lng;
    });
    this.profile();
  }

  
  profile(){
    let id=Number(this.userId);
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', JSON.stringify(id));
    this.commonAPIService.profile(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.profileInfo=resp.data;
          this.model.name=this.profileInfo.name;
          this.model.mobile=this.profileInfo.mobile;
          this.model.email=this.profileInfo.email;
          this.model.address=this.profileInfo.address;
          this.model.dob=this.profileInfo.dob;
          this.model.latitude=this.profileInfo.latitude;
          this.model.longitude=this.profileInfo.longitude;
          this.model.city=this.profileInfo.city;
          this.model.wallet=this.profileInfo.wallet;
          this.model.state=this.profileInfo.state_name;
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
  
  saveProfile(){
    let id=Number(this.userId);
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', JSON.stringify(id));
    formData.append('name', this.model.name);
    formData.append('email', this.model.email);
    formData.append('address', this.model.address);
    formData.append('city', this.model.city);
    formData.append('dob', this.model.dob);
    this.commonAPIService.update_profile(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.showSuccess(resp.msg);
          this.profile();
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

  address_book(){    
    localStorage.setItem('setStatus','1');   
    this.router.navigate(['pages/dashboard']);
  }
  
  showSuccess(msg) {
    this.toastr.success(msg);
  }  

  showError(msg) {
    this.toastr.error(msg);
  }

}
