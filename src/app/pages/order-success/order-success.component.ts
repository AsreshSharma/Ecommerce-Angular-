import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  public readorder:any;
  public userId=0;
  public cmpId=0;
  public appoint_Id:any=0;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router, 
    private commonAPIService: CommonAPIService,
    private toastr: ToastrService) { 

    let cred=JSON.parse(localStorage.getItem("userInfo")); 
    this.userId=cred.userId;
    this.cmpId=cred.companyId;
    let appointment_id=localStorage.getItem('appiont_id');
    if(appointment_id===null || appointment_id===undefined){
        this.appoint_Id=0;
    }
    else{
      this.appoint_Id=appointment_id;
      this.orderDetail(this.appoint_Id);
    }
  }

  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {    
    localStorage.removeItem('appiont_id');
  }

  
  orderDetail(orderId){    
    let order_Id=orderId;
    this.spinner.show();
    const formData = new FormData();
    formData.append('order_id', order_Id);
    this.commonAPIService.orderDetail(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.readorder=resp.data;
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

  continueshopping(){
    localStorage.removeItem('appiont_id');
    this.router.navigateByUrl('/home/fashion');
  }
}
