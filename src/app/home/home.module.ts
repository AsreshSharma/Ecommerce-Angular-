import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { FashionOneComponent } from './fashion/fashion-one/fashion-one.component';

// Widgest Components
import { SliderComponent } from './widgets/slider/slider.component';
import { BlogComponent } from './widgets/blog/blog.component';
import { LogoComponent } from './widgets/logo/logo.component';
import { InstagramComponent } from './widgets/instagram/instagram.component';
import { ServicesComponent } from './widgets/services/services.component';
import { CollectionComponent } from './widgets/collection/collection.component';
import { OfferComponent } from './offer/offer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OfferDetailComponent } from './offer/offer-detail/offer-detail.component';


import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    FashionOneComponent,
    
    // Widgest Components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    InstagramComponent,
    ServicesComponent,
    CollectionComponent,
    OfferComponent,
    AboutusComponent,
    OfferDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }
