import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/product.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') form: any;
  stateList = [];
  cityList=[];
  selectedState = "";
  model = {
    name: "",
    mobile: "",
    password: "",
    repassword:"",
    email: "",
    refferal: "",
    city: "",
    state:""
  }
  latitude:any;
  longitude:any;
  
  public cmplogo='./assets/images/about-main2.jpg';
  public cmpid='';
  public get_fcm_token:any='';
  constructor(public productService: ProductService,private spinner: NgxSpinnerService,private toastr: ToastrService,private router : Router, private commonAPIService: CommonAPIService) { 
    this.cmplogo=localStorage.getItem('logo');
    this.cmpid=localStorage.getItem('cmp_id');      
    this.productService.getPosition().then(pos=>{
      this.latitude=pos.lat;
      this.longitude=pos.lng;
    });     
    this.get_fcm_token=localStorage.getItem('token');
  }
  
  ngOnInit(): void {
    document.body.className = "bg-gradient";
    this.state();    
    this.productService.getPosition().then(pos=>{
      // console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.latitude=pos.lat;
      this.longitude=pos.lng;
    }); 
    this.get_fcm_token=localStorage.getItem('token');
  }

  ngOnDestroy(){
    document.body.className="";
  }

  
  saveregister(event) {  
    this.spinner.show();    
      const formData = new FormData();
      formData.append('name', this.model.name);
      formData.append('mobile', this.model.mobile);
      formData.append('password', this.model.password);
      formData.append('repassword', this.model.repassword);
      formData.append('city_id', this.model.city);
      formData.append('state_id', this.model.state);
      formData.append('cmp_id', this.cmpid);
      formData.append('refferal', this.model.refferal);
      formData.append('latitude', this.latitude);
      formData.append('longitude', this.longitude);
      formData.append('fcm_token',this.get_fcm_token);
      this.commonAPIService.registerUser(formData).subscribe(resp => {        
          this.spinner.hide();
          if (resp && resp.status == 1 && resp.data ) {
            this.showSuccess('Registration successfull.');
            this.form.reset();
            this.router.navigate(['/pages/login']);
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
        // console.log("Complete function triggered.")
        }
      );
  }

  moveToLogin() {
    this.router.navigate(['/pages/login']);
  }

  // get all state 
  state(){         
    this.spinner.show();
    this.commonAPIService.state().subscribe(resp => {        
      this.spinner.hide();
      if (resp && resp.status == 1 && resp.data ) {
        this.stateList=resp.data;
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
      // console.log("Complete function triggered.")
    });
  }

  // get only state according city then otherwise city empty
  stateChange(event){
    this.spinner.show();    
    const formData = new FormData();
    formData.append('state_id', event);
    this.commonAPIService.city(formData).subscribe(resp => {        
      this.spinner.hide();
      if (resp && resp.status == 1 && resp.data ) {
        this.cityList=resp.data;
      } 
      else {
        this.cityList=[];
        this.showError(resp.msg);
      }
    },
    err => {      
      this.spinner.hide();
      this.showError(err);
    },
    () => {
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
