export let apiConfig;

const apiServiceBasePath = "https://express.accountantlalaji.com/";

apiConfig = {
  "userLogin":  apiServiceBasePath + "newapp/api/clientapi/login",
  "fetchCategoryList": apiServiceBasePath + "newapp/api/clientapi/category_list",
  "addNewCategory": apiServiceBasePath + "newapp/webapi/Orchidvendor/categoryadd", 
  "fetchAllProductsByCategoryId": apiServiceBasePath + "newapp/api/clientapi/category_detail",//
  "addNewProduct": apiServiceBasePath + "newapp/webapi/Orchidvendor/servicesadd",
  "fetchProductById": apiServiceBasePath + "newapp/webapi/Orchidvendor/servicesview",
  "userAddressList":  apiServiceBasePath + "newapp/api/clientapi/listofaddresses",
  "listOfSlotsAvailable": apiServiceBasePath + "newapp/api/clientapi/slot",
  "getUpcomingOrderList":  apiServiceBasePath + "newapp/api/clientapi/upcomingorderlist",
  "getPreviousOrderList":  apiServiceBasePath + "newapp/api/clientapi/previousorderlist",
  "getOrderDetails":  apiServiceBasePath + "newapp/api/clientapi/orderDetail",
  "getCompanyDetails":  apiServiceBasePath + "newapp/api/clientapi/company_detail",
  "placeNewOrder":  apiServiceBasePath + "newapp/api/clientapi/new_order",
  "instantOrder":  apiServiceBasePath + "newapp/api/clientapi/instant_order",
  "fetchUserProfile":apiServiceBasePath + "newapp/api/clientapi/profile",
  "fetchBanner":apiServiceBasePath + "newapp/api/clientapi/banner",
  "fetchOffers":apiServiceBasePath + "newapp/api/clientapi/list_of_coupons",
  "fetchOfferdetail":apiServiceBasePath + "newapp/api/clientapi/coupon_detail",
  "applycouponcode":apiServiceBasePath + "newapp/api/clientapi/checkCodeValidity2",
  "fetchFeatureProducts":apiServiceBasePath + "newapp/api/clientapi/featured_products",
  "getCompanySupportDetails":apiServiceBasePath + "newapp/api/clientapi/support",
  "productSearch":apiServiceBasePath + "newapp/api/clientapi/product_search",
  "fetchProductDetails":apiServiceBasePath + "newapp/api/clientapi/product_detail",
  "addNewAddress":apiServiceBasePath + "newapp/api/clientapi/addressadd",
  "getaddress":apiServiceBasePath + "newapp/api/clientapi/getaddress",
  "addressupdate":apiServiceBasePath + "newapp/api/clientapi/addressupdate",
  "deletedaddress":apiServiceBasePath + "newapp/api/clientapi/deletedaddress",
  "list_product":apiServiceBasePath + "newapp/api/clientapi/list_product",
  "leftmenuitems":apiServiceBasePath + "newapp/api/clientapi/leftmenuitems",
  "registerUser": apiServiceBasePath + "newapp/api/clientapi/signup",
  "state": apiServiceBasePath + "newapp/api/clientapi/state",
  "citybystate": apiServiceBasePath + "newapp/api/clientapi/city",
  "minbillingamountcheck": apiServiceBasePath + "newapp/api/clientapi/minbillingamountcheck",
  "profile": apiServiceBasePath + "newapp/api/clientapi/profile",
  "update_profile": apiServiceBasePath + "newapp/api/clientapi/update_profile",
  "upcomingorderlist": apiServiceBasePath + "newapp/api/clientapi/upcomingorderlist",
  "upcomingorderlistmore": apiServiceBasePath + "newapp/api/clientapi/upcomingorderlistmore",
  "previousorderlist": apiServiceBasePath + "newapp/api/clientapi/previousorderlist",
  "orderDetail": apiServiceBasePath + "newapp/api/clientapi/orderDetail",
  "changePassword": apiServiceBasePath + "newapp/api/clientapi/change_password",
  "appointview": apiServiceBasePath + "newapp/api1/appointmentviewnotprint",
  "billview": apiServiceBasePath + "newapp/api1/stock_sale_print",
  "searchwebsite": apiServiceBasePath + "newapp/api/clientapi/searchwebsite",
  "aboutus": apiServiceBasePath + "newapp/api/clientapi/aboutus",
  "deliverychargesapply": apiServiceBasePath + "newapp/api/clientapi/deliverychargesapply",
  "get_otp": apiServiceBasePath + "newapp/api/clientapi/newget_otp",
  "verify_otp": apiServiceBasePath + "newapp/api/clientapi/newverify_otp",
  "create_password": apiServiceBasePath + "newapp/api/clientapi/create_password",
}