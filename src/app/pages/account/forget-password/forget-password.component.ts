import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  step:any=0;
  mobile:any='';
  otp:any='';
  new_password:any='';
  confirm_password:any='';
  id:any='0';
  cmpid='';
  constructor(private spinner: NgxSpinnerService,private router: Router,private commonAPIService: CommonAPIService,
    private toastr: ToastrService) { 
      
      this.cmpid=localStorage.getItem('cmp_id');
  }

  ngOnInit(): void {
    document.body.className = "bg-gradient";
    this.cmpid=localStorage.getItem('cmp_id');
  }

  ngOnDestroy(){
    document.body.className="";
  }

  next(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('mobile_no', this.mobile);
    formData.append('cmp_id', this.cmpid);
    this.commonAPIService.get_otp(formData).subscribe(resp => {
      this.spinner.hide();
      if (resp && resp.status==1) {
        this.step=1;
        this.showSuccess(resp.msg);
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

  verify(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('mobile_no', this.mobile);
    formData.append('otp', this.otp);
    formData.append('cmp_id', this.cmpid);
    this.commonAPIService.verify_otp(formData).subscribe(resp => {
      this.spinner.hide();
      if (resp && resp.status==1) {
        this.id=resp.data;
        this.step=2;
        this.showSuccess(resp.msg);
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

  continue(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('new_password', this.new_password);
    formData.append('confirm_password', this.confirm_password);
    this.commonAPIService.create_password(formData).subscribe(resp => {
      this.spinner.hide();
      if (resp && resp.status==1) {
        this.step=0;
        this.showSuccess(resp.msg);     
        this.new_password='';      
        this.confirm_password='';   
        this.id='';
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
