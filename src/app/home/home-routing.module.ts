import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FashionOneComponent } from './fashion/fashion-one/fashion-one.component';
import { OfferComponent } from './offer/offer.component';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {
    path: 'fashion',
    component: FashionOneComponent
  },
  {
    path: 'fashion/offers',
    component: OfferComponent
  },
  {
    path: 'fashion/aboutus',
    component: AboutusComponent
  },
  {
    path: 'offer/offer-details/:slug',
    component: OfferDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { 

}
