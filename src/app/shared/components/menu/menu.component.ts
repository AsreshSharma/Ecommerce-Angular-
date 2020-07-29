import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { CommonAPIService } from 'src/app/shared/services/common-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  public menuItems: Menu[];
  public listcategory:[];
  public companyId:any=0;
  constructor(private router: Router, public navServices: NavService, private commonAPIServices: CommonAPIService) {
    // this.navServices.items.subscribe(menuItems => this.menuItems = menuItems );
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
    
    this.companyId=localStorage.getItem("cmp_id");
    const formData = new FormData();//946
    formData.append('cmp_id', this.companyId);
    this.commonAPIServices.leftmenuheader(formData).subscribe(result => {
      if (result) {
        this.listcategory=result[0];      
        let cred=JSON.parse(localStorage.getItem("userInfo")); 
        if(cred==undefined || cred==null){
          this.menuItems=[      
              {			
                path: '/home/fashion', title: 'HOME', type: 'link'
              },   
              {			
                path: '/home/fashion/aboutus', title: 'About Us', type: 'link'
              },
              {			
                title: 'Category', type: 'sub', active: false, children:this.listcategory
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
            this.menuItems=[      
              {			
                path: '/home/fashion', title: 'HOME', type: 'link'
              }, 
              {			
                path: '/home/fashion/aboutus', title: 'About Us', type: 'link'
              },
              {			
                title: 'Category', type: 'sub', active: false, children:this.listcategory
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
    });    
  }

  ngOnInit(): void {   
    this.getheaderlinks();
  }

  mainMenuToggle(): void {
    this.navServices.mainMenuToggle = !this.navServices.mainMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

  
  getheaderlinks(){    
    let cred=JSON.parse(localStorage.getItem("userInfo")); 
    if(cred==undefined || cred==null){
      // console.log('Not login customer');
      this.menuItems=[      
          {			
            path: '/home/fashion', title: 'HOME', type: 'link'
          },   
          {			
            title: 'Category', type: 'sub', active: false, children:this.listcategory
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
        this.menuItems=[      
          {			
            path: '/home/fashion', title: 'HOME', type: 'link'
          },
          {			
            title: 'Category', type: 'sub', active: false, children:this.listcategory
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

    this.companyId=localStorage.getItem("cmp_id");
    const formData = new FormData();//946
    formData.append('cmp_id', this.companyId);
    this.commonAPIServices.leftmenuheader(formData).subscribe(result => {
      if (result) {
        this.listcategory=result[0];  
      }
    });
  }

}
