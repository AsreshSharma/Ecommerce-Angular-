import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  @ViewChild('accountForm') form: any;
  // 8904470398
  userIconPath = 'assets/images/user-round.png';
  showMsgBox = false;
  userId = "";
  password = "";
  isNotValidUser = null;
  apiErrorMsg = "";

  public cmplogo='./assets/images/about-main2.jpg';
  public cmpid='';
  public get_fcm_token:any='';
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router, 
    private commonAPIService: CommonAPIService,
    private toastr: ToastrService,private messagingService: MessagingService) { 
      this.cmplogo=localStorage.getItem('logo');
      this.cmpid=localStorage.getItem('cmp_id');
    }

  ngOnInit() {    
    
    if(localStorage.getItem("userInfo")!=undefined || localStorage.getItem("userInfo")!=null){      
      this.router.navigate(['/dashboard']);
    }  
    // document.body.style.background="#dddada";
    document.body.className = "bg-gradient";
    
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.messagingService.currentMessage;    
    this.get_fcm_token=localStorage.getItem('token');
  }
  
  ngOnDestroy(){
    document.body.className="";
  }
  

  openSignUp(){
    this.router.navigate(['pages/register']);
  }

  onSubmit(event) {
    // console.log("Inside Submit.");
    this.spinner.show();
    if (this.form.valid ) {
      const formData = new FormData();
      formData.append('cmp_id', this.cmpid);
      formData.append('mobile_no', this.userId);
      formData.append('password', this.password);
      formData.append('fcm_token',this.get_fcm_token);
      this.commonAPIService.userLogin(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data && resp.data.id !== null && resp.data.cmp_id) {
          this.showSuccess("loging successfull.");
          this.form.reset();
          var userInfoObj = { userId: resp.data.id, companyId: resp.data.cmp_id };
          localStorage.setItem("userInfo", JSON.stringify(userInfoObj));
          localStorage.setItem("isLoggedIn", "Y");
          this.navigateToDashBoard(resp.data.cmp_id);
        } 
        else {
          this.apiErrorMsg = resp.msg;          
          this.showError(this.apiErrorMsg);
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
    else {      
      this.spinner.hide();
      this.showError('User login process failed..');
    }
  }
  showSuccess(msg) {
    this.toastr.success(msg);
  }  
  showError(msg) {
    this.toastr.error(msg);
  }
  
  navigateToDashBoard(companyId) {
    // console.log("starting :  navigateToDashBoard.")
    this.router.navigate(['/dashboard']);
  }

  closeAlert() {
    this.showMsgBox = false;
  }
}
