import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../classes/Category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() category : Category;
  constructor(private router: Router) { 
    // localStorage.getItem("categoryId");
  }

  ngOnInit(): void {
    // console.log("category " + this.category)
  }


  navigateToProductsList(category) {
    // console.log("starting :  navigateToProductsList.")
    localStorage.setItem("categoryId", category.category_id);
    this.router.navigate(['/shop/productList/left/sidebar/']);
  }

}
