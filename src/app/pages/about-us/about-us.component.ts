import { Component, OnInit,SecurityContext  } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { TeamSlider, TestimonialSlider } from '../../shared/data/slider';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public about:any='';  
  result: any;
  constructor(private spinner: NgxSpinnerService,
    private router: Router, 
    private commonAPIService: CommonAPIService,
    private toastr: ToastrService,
    private sanitized: DomSanitizer) { 

  }

  ngOnInit(): void {
    this.getaboutus();
  }

  getaboutus(){
    this.spinner.show();
    const formData = new FormData();
    formData.append('cmp_id', localStorage.getItem("cmp_id"));
    this.commonAPIService.aboutus(formData).subscribe(resp => {
        this.spinner.hide();
        if (resp && resp.status == 1 && resp.data) {
          this.about=resp.data;          
          this.result=this.sanitized.bypassSecurityTrustHtml(resp.data.description); 
          // this.result=this.sanitized.sanitize(SecurityContext.HTML,this.sanitized.bypassSecurityTrustHtml(resp.data.description));
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

  public TeamSliderConfig: any = TeamSlider;
  public TestimonialSliderConfig: any = TestimonialSlider;

  // Testimonial Carousel
  public testimonial = [{
    image: 'assets/images/testimonial/1.jpg',
    name: 'Mark jkcno',
    designation: 'Designer',
    description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }, 
  {
    image: 'assets/images/testimonial/2.jpg',
    name: 'Adegoke Yusuff',
    designation: 'Content Writer',
    description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }, 
  {
    image: 'assets/images/testimonial/1.jpg',
    name: 'John Shipmen',
    designation: 'Lead Developer',
    description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  }]

  // Team 
  public team = [
  {
    image: 'assets/images/team/1.jpg',
    name: 'Mark jkcno',
    designation: 'Designer'
  }, 
  {
    image: 'assets/images/team/2.jpg',
    name: 'Adegoke Yusuff',
    designation: 'Content Writer'
  }, 
  {
    image: 'assets/images/team/3.jpg',
    name: 'John Shipmen',
    designation: 'Lead Developer'
  }, 
  {
    image: 'assets/images/team/4.jpg',
    name: 'Hileri Keol',
    designation: 'CEO & Founder at Company'
  }, 
  {
    image: 'assets/images/team/3.jpg',
    name: 'John Shipmen',
    designation: 'Lead Developer'
 }]

}
