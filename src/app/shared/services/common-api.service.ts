import { Injectable } from '@angular/core';
import {apiConfig} from '../../config/APIConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonAPIService {

  requiredCartValue = 0;
  constructor(private http: HttpClient) { }

  fetchBanners(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.fetchBanner, requestBody);
  }

  fetchOffers(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.fetchOffers, requestBody);
  }

  fetchOfferdetail(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.fetchOfferdetail, requestBody);
  }
  
  applycouponcode(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.applycouponcode, requestBody);
  }


  fetchFeatureProducts(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.fetchFeatureProducts, requestBody);
  }

  fetchCategoryList(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.fetchCategoryList, requestBody);
  }

  userLogin(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.userLogin, requestBody);
  }

  getCompanyDetails(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.getCompanyDetails, requestBody);
  }

  registerUser(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.registerUser, requestBody);
  }

  fetchUserAddressList(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.userAddressList, requestBody);
  }

  addNewAddress(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.addNewAddress, requestBody);
  }
  
  getNewAddress(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.getaddress, requestBody);
  }

  updateNewAddress(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.addressupdate, requestBody);
  }

  deleteNewAddress(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.deletedaddress, requestBody);
  }

  listOfSlotsAvailable(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.listOfSlotsAvailable, requestBody);
  }

  placeNewOrder(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.placeNewOrder, requestBody);
  }
  
  instantOrder(requestBody): Observable<any> {
    return this.http.post<any>(apiConfig.instantOrder, requestBody);
  }


  state():Observable<any> {
    return this.http.get<any>(apiConfig.state);
  }

  city(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.citybystate,requestBody);
  }
  
  
  
  minbillingamountcheck(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.minbillingamountcheck,requestBody);
  }
  
  
  profile(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.profile,requestBody);
  }

  
  upcomingorderlist(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.upcomingorderlist,requestBody);
  }
  
  upcomingorderlistmore(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.upcomingorderlistmore,requestBody);
  }
  
  previousorderlist(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.previousorderlist,requestBody);
  }
  
  orderDetail(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.orderDetail,requestBody);
  }
    
  changePassword(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.changePassword,requestBody);
  }
  
  appointview(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.appointview,requestBody);
  }

  billview(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.billview,requestBody);
  }

  searchwebsite(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.searchwebsite,requestBody);
  }

  update_profile(requestBody):Observable<any> {
    return this.http.post<any>(apiConfig.update_profile,requestBody);
  }

  leftmenuheader(requestBody):Observable<any> {    
    return this.http.post<any>(apiConfig.leftmenuitems,requestBody);
  }

  aboutus(requestBody):Observable<any> {    
    return this.http.post<any>(apiConfig.aboutus,requestBody);
  }

  productSearch(requestBody):Observable<any> {    
    return this.http.post<any>(apiConfig.productSearch,requestBody);
  }
  
  deliverychargesapply(requestBody):Observable<any> {    
    return this.http.post<any>(apiConfig.deliverychargesapply,requestBody);
  }

  
  get_otp(requestBody):Observable<any> {    
    return this.http.post<any>(apiConfig.get_otp,requestBody);
  }

  verify_otp(requestBody):Observable<any> {    
    return this.http.post<any>(apiConfig.verify_otp,requestBody);
  }  

  create_password(requestBody):Observable<any> {    
    return this.http.post<any>(apiConfig.create_password,requestBody);
  }
  
}
