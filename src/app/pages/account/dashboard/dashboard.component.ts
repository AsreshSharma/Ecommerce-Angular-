import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public up_pre_status='1';
  public openDashboard: boolean = false;
  public profileInfo:any;
  public userId=0;
  public cmpId=0;
  public statusNo=2;

  public orders:any;
  public lastid=0;
  public loadmoredata=0;
  public readorder:any;
  public addressLists:any;
  public addressStatus=0;
  public addressID=0;  
  stateList = [];
  cityList=[];

  addressForm={
    name:'',
    mobile:'',
    address:'',
    state:'',
    city:'',
    status:'1',
    latitude:'',
    longitude:'',
  }

  cp={
    old_password:"",
    new_password:"",
    confirm_password:"",
  }

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
    if(localStorage.getItem('setStatus')=='0'){
      this.statusNo=0;
      this.profile();
    }
    else if(localStorage.getItem('setStatus')=='1'){
      this.statusNo=1;
      this.address_book();
    }
    else{
      this.my_orders();
    }
    this.state();
    this.productService.getPosition().then(pos=>{
      this.latitude=pos.lat;
      this.longitude=pos.lng;
    });
  }

  account_info(){
    this.openDashboard =false;
    this.statusNo=0;
    this.profile();
  }

  address_book(){
    this.openDashboard =false;
    this.statusNo=1;
    this.addressStatus=0;
    this.userAddressList();
  }
  
  my_orders(){
    this.openDashboard =false;
    this.statusNo=2;
    this.upcomingorderlist();
  }
  
  my_wishlist(){
    this.statusNo=3;
  }
  
  
  news_letter(){
    this.statusNo=4;
  }
  
  
  my_account(){
    this.statusNo=5;
  }
  
  
  change_password(){
    this.openDashboard =false;
    this.statusNo=6;
  }
  
  logout(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    localStorage.clear();
    this.router.navigate(['/pages/login']);
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
  
  upcomingorderlist(){
    this.up_pre_status="1";
    this.readorder='';
    let id=Number(this.userId);
    let cmpId=Number(this.cmpId);
    this.spinner.show();
    const formData = new FormData();
    formData.append('customer_id', JSON.stringify(id));
    formData.append('cmp_id', JSON.stringify(cmpId));
    this.commonAPIService.upcomingorderlist(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.orders=resp.data;
          this.lastid=resp.loadmore.lastid;
          this.loadmoredata=resp.loadmore.loadmoredata;
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
  
  upcomingorderlistmore(){
    this.up_pre_status="1";
    this.readorder='';
    let id=Number(this.userId);
    let cmpId=Number(this.cmpId);
    let lastid=Number(this.lastid);
    this.spinner.show();
    const formData = new FormData();
    formData.append('customer_id', JSON.stringify(id));
    formData.append('cmp_id', JSON.stringify(cmpId));
    formData.append('lastid', JSON.stringify(lastid));
    this.commonAPIService.upcomingorderlistmore(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {            
          let item=resp.data;
          for (let i = 0; i < item.length; ++i) {
              const item2 = item[i];
              this.orders.push({
                  amount: item2.amount,
                  cmp_address: item2.cmp_address,
                  cmp_name: item2.cmp_name,
                  id: item2.id,
                  date: item2.date,
                  order_no: item2.order_no,
                  coupon: item2.coupon,
                  slot_time: item2.slot_time,
                  status: item2.status,
                  status_msg:item2.status_msg
              });
          }
          // this.orders=resp.data;
          this.lastid=resp.loadmore.lastid;
          this.loadmoredata=resp.loadmore.loadmoredata;
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
  
  previousorderlist(){
    this.up_pre_status="2";
    this.readorder='';
    this.lastid=0;
    this.loadmoredata=0;
    let id=Number(this.userId);
    let cmpId=Number(this.cmpId);
    this.spinner.show();
    const formData = new FormData();
    formData.append('customer_id', JSON.stringify(id));
    formData.append('cmp_id', JSON.stringify(cmpId));
    this.commonAPIService.previousorderlist(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.orders=resp.data;
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

  callme(orderId){
    console.log('Call Me');
  }

  orderDetail(orderId){    
    this.lastid=0;
    this.loadmoredata=0;
    let order_Id=orderId;
    this.spinner.show();
    const formData = new FormData();
    formData.append('order_id', order_Id);
    this.commonAPIService.orderDetail(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.readorder=resp.data;
          this.orders=[];
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

  appointview(appointment_id){
    this.lastid=0;
    this.loadmoredata=0;
    let order_Id=appointment_id;
    this.spinner.show();
    const formData = new FormData();
    formData.append('appointment_id', order_Id);
    this.commonAPIService.appointview(formData).subscribe(resp => {
        this.spinner.hide();
        this.orders=[];
        this.readorder=resp;
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

  billview(invoice_id){
    this.lastid=0;
    this.loadmoredata=0;
    let order_Id=invoice_id;
    this.spinner.show();
    const formData = new FormData();
    formData.append('invoice_id', order_Id);
    this.commonAPIService.billview(formData).subscribe(resp => {
        this.spinner.hide();
        this.orders=[];
        this.readorder=resp;
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
  
  updateAddress(addressid){
    this.addressStatus=2;
    this.addressID=addressid;
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', JSON.stringify(Number(this.addressID)));
    this.commonAPIService.getNewAddress(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          // this.addressLists=resp.data;  
          this.stateChange(resp.data.state);        
          this.addressForm.name=resp.data.name;
          this.addressForm.mobile=resp.data.mobile;
          this.addressForm.address=resp.data.address;
          this.addressForm.state=resp.data.state;
          this.addressForm.city=resp.data.city;
          this.addressForm.status=resp.data.status,
          this.addressForm.latitude=resp.data.latitude;
          this.addressForm.longitude=resp.data.longitude;
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

  addAddress(){
    this.addressStatus=1;
    this.addressID=0;    
    this.addressForm.latitude=this.latitude;
    this.addressForm.longitude=this.longitude;
  }

  saveaddAddress(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', JSON.stringify(Number(this.userId)));
    formData.append('name', this.addressForm.name);
    formData.append('mobile', this.addressForm.mobile);
    formData.append('address', this.addressForm.address);
    formData.append('state', this.addressForm.state);
    formData.append('city', this.addressForm.city);
    formData.append('latitude', this.addressForm.latitude);
    formData.append('longitude', this.addressForm.longitude);
    formData.append('status', this.addressForm.status);
    this.commonAPIService.addNewAddress(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1) {  
          this.showSuccess(resp.msg);    
          this.address_book();  
          this.resetaddressForm();
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
  

  saveupdateAddress(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', JSON.stringify(Number(this.addressID)));
    formData.append('name', this.addressForm.name);
    formData.append('mobile', this.addressForm.mobile);
    formData.append('address', this.addressForm.address);
    formData.append('state', this.addressForm.state);
    formData.append('city', this.addressForm.city);
    formData.append('latitude', this.addressForm.latitude);
    formData.append('longitude', this.addressForm.longitude);
    formData.append('status', this.addressForm.status);
    this.commonAPIService.updateNewAddress(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1) {  
          this.address_book();
          this.showSuccess(resp.msg);      
          this.resetaddressForm();
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

  userAddressList(){  
    this.resetaddressForm();      
    this.addressID=0;
    let id=Number(this.userId);
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', JSON.stringify(id));
    this.commonAPIService.fetchUserAddressList(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.addressLists=resp.data;
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

  // reset data for addressForm
  resetaddressForm(){
    this.addressForm.name='';
    this.addressForm.mobile='';
    this.addressForm.address='';
    this.addressForm.state='';
    this.addressForm.city='';
    this.addressForm.status='1',
    this.addressForm.latitude='';
    this.addressForm.longitude='';
  }

  cpSave(){
    let id=Number(this.userId);
    this.spinner.show();
    const formData = new FormData();
    formData.append('id', JSON.stringify(id));
    formData.append('old_password', this.cp.old_password);
    formData.append('new_password', this.cp.new_password);
    formData.append('confirm_password', this.cp.confirm_password);
    this.commonAPIService.changePassword(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {          
          this.showSuccess(resp.data);
          this.cp.old_password='';
          this.cp.new_password='';
          this.cp.confirm_password='';
        } 
        else {       
          this.showError(resp.data);
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



  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }  

  showError(msg) {
    this.toastr.error(msg);
  }

  public checkactive(id){
    if(id==this.statusNo){
      return 'active';
    }
  }

  public upprestatus(id){
    if(id==this.up_pre_status){
      return 'btnActive';
    }
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
}
