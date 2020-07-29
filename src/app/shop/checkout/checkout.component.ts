import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { CommonAPIService } from 'src/app/shared/services/common-api.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { json } from 'express';


import { CouponlistComponent } from '../couponlist/couponlist/couponlist.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm: FormGroup;
  public products: Product[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'Stripe';
  public amount: any;
  public cmp_id:any;
  public isLogin='';
  public backdate='';
  public anotherAddressID:any=0;

  //start
  showWarningForMinCartValue = true;
  isEditModeForAddress = false;
  isAddressSelected = false;
  addressList = [];
  slotsList = [];
  bsSelectedValue = new Date();
  minCartValue:any=0;
  selectedAddress: any = null;
  selectedSlot: any = null;
  paymentMethodObj: any = null;
  isSlotSelected = false;
  showPayment = false;
  totalamount:any=0;

  couponcode_id='';
  couponcode='';
  couponapplyamt:any=0;
  couponStatus:any='0';
  paymentMethodOptions = [
    {
      "code": "COD",
      "desc": "COD"
    },
    {
      "code": "NB",
      "desc": "Pay Now"
    }

  ];
  
  orderingMethodObj: any = null;  
  public order: string = 'Scheduled';
  orderAcceptingMethods='';
  orderingMethodOptions = [
    {
      "code": "2",
      "desc": "Scheduled Ordering "
    },
    {
      "code": "1",
      "desc": "Express Ordering "
    }

  ];

  model = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    mobile: "",
    altMobile: "",
    city: "",
    state: ""
  }

  stateList = [];
  selectedState = "";
  cityList = [];
  totalTax:any=0;
  subtotal:any=0;
  subqty:any=0;
  finalamt:any=0;
  //end

  
  latitude:any;
  longitude:any;

  isSchedule:number=0;
  constructor(
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router, 
    public productService: ProductService,
    private orderService: OrderService, private commonAPIServices: CommonAPIService) {
    let today = new Date();
    this.fetchAvailableTimeSlots(today);
    this.cmp_id=localStorage.getItem('cmp_id');
    if(localStorage.getItem("userInfo")){
      this.isLogin='true';
    }
    else{
      this.isLogin='';
    }
    this.showAddressList();
    
    this.productService.getPosition().then(pos=>{
      this.latitude=pos.lat;
      this.longitude=pos.lng;
    });
  }

  ngOnInit(): void {
    this.state();
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(amount => this.amount = amount);
    this.initConfig();
    
    for (var i = 0; i < this.products.length; i++) {
      if(this.products[i].price_new){
        if(this.products[i].hsn){
          let price=this.products[i].price;
          let mop_new=this.products[i].price_new;
          let tax=this.products[i].hsn;
          let hundred=100;
          let oneTax=(mop_new*tax/hundred);
          let qty=this.products[i].quantity;
          let getTax=(oneTax*qty);
          this.subtotal=(Number(this.subtotal)+Number(mop_new));
          this.totalTax=(this.totalTax+getTax);
          this.subqty=(this.subqty+qty);
          this.finalamt=(this.finalamt+Number(price*qty));
        }
      }
    }          
    this.getamountorder();
    // console.log(this.totalTax);
    
    this.productService.getPosition().then(pos=>{
      this.latitude=pos.lat;
      this.longitude=pos.lng;
    });
  }

  
  // get all state 
  state(){         
    this.spinner.show();
    this.commonAPIServices.state().subscribe(resp => {        
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

  // get all state 
  getamountorder(){         
    this.spinner.show();
    // let cred=JSON.parse(localStorage.getItem("userInfo")); 
    const formData = new FormData();
    formData.append('cmp_id', this.cmp_id);
    this.commonAPIServices.minbillingamountcheck(formData).subscribe(resp => {        
      this.spinner.hide();
      if (resp && resp.status == 1 && resp.data ) {
        this.minCartValue=resp.data.min_order;
        this.orderAcceptingMethods=resp.data.order_accepting_methods;

        if(resp.data.order_accepting_methods=='1'){
          this.orderingMethodObj='1';
          this.isSchedule=0;
        }
        else if(resp.data.order_accepting_methods=='2'){
          this.orderingMethodObj='2';
          this.isSchedule=1;
        }

        let total = 0;
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].price) {
                total += this.products[i].price * this.products[i].quantity;
                this.totalamount = total;
            }
        }        
        let finalamt=total;
        let cmplimitamt=this.minCartValue;
        if(finalamt >= cmplimitamt){
          this.showWarningForMinCartValue=true;
        }
        else{
          this.showWarningForMinCartValue=false;
        }
      } 
      else {
        this.minCartValue=0;
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


  showAddressPanel() {
    this.isEditModeForAddress = true;
  }

  closeAddressPanel(){    
    this.isEditModeForAddress = false;
  }

  showAddressList() {
    if(localStorage.getItem("userInfo")==null || localStorage.getItem("userInfo")==undefined){

    }
    else{
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let userId = userInfo.userId;
      const formData = new FormData();
      formData.append('id', userId);
      this.commonAPIServices.fetchUserAddressList(formData).subscribe(resp => {
        this.addressList = resp.data;
        this.isAddressSelected = !this.isAddressSelected;
      });
    }
  }

  confirmAddress() {
    // console.log(this.selectedAddress.id);
    this.anotherAddressID=this.selectedAddress.id;
    // console.log('selectedAddress', this.selectedAddress);
    this.isAddressSelected = !this.isAddressSelected;
    // this.isAddressSelected=true;
    this.isEditModeForAddress = false;
  }

  onCalendarValueChange(value) {
    this.slotsList=[];
    this.spinner.show();
    this.bsSelectedValue=value;
    this.cmp_id=localStorage.getItem('cmp_id');
    const formData = new FormData();
    formData.append('cmp_id', this.cmp_id);
    formData.append('date', value);
    this.commonAPIServices.listOfSlotsAvailable(formData).subscribe(resp => {        
      this.spinner.hide();
      if (resp && resp.status == 1 && resp.data ) {
        this.slotsList=resp.data;
      } 
      else {
        this.slotsList=[];
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
    // console.log(value);
    // this.fetchAvailableTimeSlots(value);
  }

  fetchAvailableTimeSlots(date) {
    /*
    if (date) {
      this.bsSelectedValue;
      // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // let companyId = localStorage.getItem("cmp_id");
      var todayDate = date.toISOString().split('T')[0];
      const formData = new FormData();
      formData.append('cmp_id', this.cmp_id);
      formData.append('date', todayDate);
      this.commonAPIServices.listOfSlotsAvailable(formData).subscribe(resp => {
        this.slotsList = resp.data;
        // console.log(this.slotsList.length);
      });
    }
    */
    if(date){
      var todayDate = date.toISOString().split('T')[0];
      // console.log(todayDate);
      this.spinner.show();
      // let cred=JSON.parse(localStorage.getItem("userInfo"));       
      this.bsSelectedValue=todayDate;
      this.backdate=todayDate;
      this.cmp_id=localStorage.getItem('cmp_id');
      const formData = new FormData();
      formData.append('cmp_id', this.cmp_id);
      formData.append('date', todayDate);
      this.commonAPIServices.listOfSlotsAvailable(formData).subscribe(resp => {        
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data ) {
          this.slotsList=resp.data;
        } 
        else {
          this.slotsList=[];
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

  changeSlot(){    
    this.isSlotSelected=false;
    this.showPayment=false;
  }

  confirmSlots() {
    // console.log('selectedSlots', this.selectedSlot);
    this.isSlotSelected =true;
    this.showPayment = !this.showPayment;
  }

  onOrderingChange(event){
    this.orderingMethodObj=event;
    if(event=='2'){
      this.isSchedule=1;
    }
    else{
      this.isSchedule=0;
    }
  }

  placeOrder() {
    var todayDate=this.bsSelectedValue;
    if (this.products && this.products.length > 0) {
      let addressID=this.anotherAddressID;
      if(addressID > 0){  
        let ordering=this.orderingMethodObj; 
        if(ordering=='2'){          
          let isSlote=this.isSlotSelected;
          if(isSlote==true){
            let mode=this.paymentMethodObj;
            if(mode==null){
              this.showError('Choose Payment Mode');
            }
            else{
              let userInfo = JSON.parse(localStorage.getItem("userInfo"));
              let selectedPaymentOption=this.paymentMethodObj.code;
              if (userInfo && userInfo.userId && this.cmp_id && selectedPaymentOption) {
                // var todayDate = new Date().toISOString().slice(0, 10);
                const formData = new FormData();
                formData.append('customer_id', userInfo.userId);
                formData.append('cmp_id', this.cmp_id);
                formData.append('booking_date', this.datepipe.transform(todayDate, 'yyyy-MM-dd'));
                formData.append('slot_id', this.selectedSlot.id);
                formData.append('modeofpayment', selectedPaymentOption);
                formData.append('product', JSON.stringify(this.products));
                formData.append('coupon_id',this.couponcode_id);
                formData.append('couponapplyamt',this.couponapplyamt);
                formData.append('anotheraddressid',addressID);
                formData.append('payment_transaction_id', JSON.stringify(Math.random()));
                this.commonAPIServices.placeNewOrder(formData).subscribe(resp => {
                  if (resp.status == 1) {
                    this.totalTax=0;
                    this.removeProduct();
                    this.showSuccess(resp.msg + " \n " + resp.msgtitle);   
                    let appiont_id=resp.appoint_id;
                    localStorage.setItem('appiont_id',JSON.stringify(appiont_id));         
                    this.router.navigateByUrl('/pages/order/success');
                    // this.productService.destroyedCartItem();               
                    this.removeProduct();        
                    this.removeProduct();        
                    this.removeProduct();        
                    this.removeProduct();
                    // let appiont_id=resp.appoint_id;
                    // this.router.navigate(['/checkout/success/id:' + appiont_id]);   
                  } 
                  else {
                    this.showError("There is some issue while placing the order. Please contact with admin team.")
                  }
                });
              }
              else{
                this.showError('Payment mode & User Credential Invalid!.');
              }
            }
          }
          else{
            this.showError('Delivery schedule not seleted!.');   
          }
        }
        else if(ordering=='1'){ 
          let mode=this.paymentMethodObj;
          if(mode==null){
            this.showError('Choose Payment Mode');
          }
          else{
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            let selectedPaymentOption=this.paymentMethodObj.code;
            if (userInfo && userInfo.userId && this.cmp_id && selectedPaymentOption) {
              const formData = new FormData();
              formData.append('customer_id', userInfo.userId);
              formData.append('cmp_id', this.cmp_id);
              formData.append('modeofpayment', selectedPaymentOption);
              formData.append('product', JSON.stringify(this.products));
              formData.append('coupon_id',this.couponcode_id);
              formData.append('couponapplyamt',this.couponapplyamt);
              formData.append('anotheraddressid',addressID);
              formData.append('payment_transaction_id', JSON.stringify(Math.random()));
              this.commonAPIServices.instantOrder(formData).subscribe(resp => {
                if (resp.status == 1) {
                  this.totalTax=0;
                  this.removeProduct();
                  this.showSuccess(resp.msg + " \n " + resp.msgtitle);   
                  let appiont_id=resp.appoint_id;
                  localStorage.setItem('appiont_id',JSON.stringify(appiont_id));         
                  this.router.navigateByUrl('/pages/order/success');            
                  this.removeProduct();        
                  this.removeProduct();        
                  this.removeProduct();        
                  this.removeProduct();  
                } 
                else {
                  this.showError("There is some issue while placing the order. Please contact with admin team.")
                }
              });
            }
            else{
              this.showError('Payment mode & User Credential Invalid!.');
            }
          }
        }
        else{
          this.showError('Ordering not Choose'); 
        }
      }
      else{  
        this.showError('Delivery address not seleted');   
      }
    }
    else{
      this.showError('Item not found!.');
    }
  }
  

  // address add user only
  onSubmit() {
    if (this.model.firstName && this.model.mobile) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let fullName = this.model.firstName;
      let fullAddress = this.model.addressLine1;
      const formData = new FormData();
      formData.append('id', userInfo.userId);
      formData.append('name', fullName);
      formData.append('mobile', this.model.mobile);
      formData.append('address', fullAddress);
      formData.append('city', this.model.city);
      formData.append('state', this.model.state);
      formData.append('status', "1");
      formData.append('latitude', this.latitude);
      formData.append('longitude', this.longitude);
      this.commonAPIServices.addNewAddress(formData).subscribe(resp => {
        if (resp.status == 1) {
          this.showSuccess(resp.msg);
          this.isEditModeForAddress = false;
          this.showAddressList();
          this.model.firstName='';
          this.model.addressLine1='';
          this.model.mobile='';
          this.model.city='';
          this.model.state='';
        } 
        else {
          this.showError(resp.msg);          
        }
      });
    } 
    else {
      this.showError('Name and mobile number is compulsory.');
    }

  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Stripe Payment Gateway
  stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'Multikart',
      description: 'Online Fashion Store',
      amount: this.amount * 100
    })
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
      currency: this.productService.Currency.currency,
      clientId: environment.paypal_token,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: this.productService.Currency.currency,
            value: this.amount,
            breakdown: {
              item_total: {
                currency_code: this.productService.Currency.currency,
                value: this.amount
              }
            }
          }
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        size: 'small', // small | medium | large | responsive
        shape: 'rect', // pill | rect
      },
      onApprove: (data, actions) => {
        this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
        // console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          // console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        // console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
      },
      onError: err => {
        // console.log('OnError', err);
      },
      onClick: (data, actions) => {
        // console.log('onClick', data, actions);
      }
    };
  }

  
  showSuccess(msg) {
    this.toastr.success(msg);
  }  
  showError(msg) {
    this.toastr.error(msg);
  }
  
  removeProduct(){ 
    for (var i = 0; i < this.products.length; i++) {
      this.productService.removeCartItem(this.products[i]);
    }  
  }
  
  // get only state according city then otherwise city empty
  stateChange(event){
    // console.log(event);
    this.spinner.show();    
    const formData = new FormData();
    formData.append('state_id', event);
    this.commonAPIServices.city(formData).subscribe(resp => {        
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
      this.spinner.hide();
      // console.log("Complete function triggered.")
    });
    
  }

  applycode(){
    // couponcode_id='';
    // couponcode='';
    // couponapplyamt='';
    // couponStatus:any='0';
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.spinner.show();
    let cmp_id = localStorage.getItem("cmp_id");
    const formData = new FormData();
    formData.append('cmp_id', cmp_id);
    formData.append('user_id', userInfo.userId);
    formData.append('cart_amount', this.finalamt);
    formData.append('code', this.couponcode);
    this.commonAPIServices.applycouponcode(formData).subscribe(resp => {
      this.spinner.hide();
      if (resp && resp.status == 1 && resp.data ) {
        this.couponcode_id = resp.data.id;
        this.couponcode=resp.data.coupon_code;
        this.couponapplyamt=resp.data.discountamount;
        this.couponStatus='1';
      } 
      else {
        this.couponStatus='0';
        this.couponcode_id='0';
        this.couponapplyamt=0;
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
  
  removeCouponcode(){    
    this.couponStatus='0';
    this.couponcode_id='0';
    this.couponapplyamt=0;
    this.couponcode='';
  }
}
