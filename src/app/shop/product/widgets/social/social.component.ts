import { Component, OnInit, Input  } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  @Input() title: string = 'New Social'; // Default
  @Input() type: string = 'fashion'; // Default Fashion

  
  public products : Product[] = [];

  constructor(public productService: ProductService) { 
    this.productService.getProducts.subscribe(response => 
      this.products = response.filter(item => item.type == this.type)
    );
  }

  ngOnInit(): void {
  }
  
}
