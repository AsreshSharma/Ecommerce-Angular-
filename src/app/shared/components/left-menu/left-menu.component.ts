import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems: Menu[];
  
  public headerItems: Menu[];
  logoutStatus=0;
  constructor(private router: Router, public navServices: NavService,private commonAPIService: CommonAPIService) {
    
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
    
    /*
    if(localStorage.getItem('cmp_id')){
      this.navServices.leftMenuItems.subscribe(menuItems => this.menuItems = menuItems );
    }  
    */

  }

  ngOnInit(): void {
    
    let cred=JSON.parse(localStorage.getItem("userInfo")); 
    if(cred==undefined || cred==null){
      this.logoutStatus=0;
    }
    else{
      this.logoutStatus=1;
    }
  }

  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;   
    if(this.menuItems===undefined || this.menuItems===null){      
      if(localStorage.getItem('cmp_id')){
        let cmp_id=localStorage.getItem('cmp_id');
        const formData = new FormData();
        formData.append('cmp_id', cmp_id);
        this.commonAPIService.leftmenuheader(formData).subscribe(resp => {
          if(resp) {
            this.menuItems=resp[0];
          } 
        });
      }  
    }  
    
    let cred=JSON.parse(localStorage.getItem("userInfo")); 
    if(cred==undefined || cred==null){
      this.headerItems=[      
          {			
            path: '/home/fashion', title: 'HOME', type: 'link'
          },   
          {			
            path: '/home/fashion/aboutus', title: 'About Us', type: 'link'
          },
          {			
            path: '/home/fashion/offers', title: 'OFFERS', type: 'link'
          },
          {			
            path: '/pages/contact', title: 'Contact', type: 'link'
          }
      ];
    }
    else{
      // console.log('Yes login customer');      
        this.headerItems=[      
          {			
            path: '/home/fashion', title: 'HOME', type: 'link'
          }, 
          {			
            path: '/home/fashion/aboutus', title: 'About Us', type: 'link'
          },
          {			
            path: '/home/fashion/offers', title: 'OFFERS', type: 'link'
          },
          {					
            path: '/pages/dashboard',title: 'My Orders', type: 'link'
          },
          {			
            path: '/pages/contact', title: 'Contact', type: 'link'
          }
      ];
    }
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }
  
  closeleftMenuToggle(): void {
    this.navServices.leftMenuToggle = false;
  }


  
  logout(){
    this.navServices.leftMenuToggle = false;
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    localStorage.clear();
    this.router.navigate(['/pages/login']);
  }

}
