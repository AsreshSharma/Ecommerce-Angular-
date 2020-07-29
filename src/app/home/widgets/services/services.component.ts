import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public whatsno='';
  constructor(private router : Router) { 
    this.whatsno=localStorage.getItem("mobile");
  }

  ngOnInit(): void {
        this.whatsno=localStorage.getItem("mobile");
  }

  contactuspage(){
    this.router.navigate(['/pages/contact']);
  }
}
