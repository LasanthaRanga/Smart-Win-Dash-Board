import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  panelOpenState = false;
  urlProd = environment.apiUrl + 'prod/'
  products;
  constructor(private api: ApicallServiceService,private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.api.post(this.urlProd + 'getAllProduct', {}, data => {
      this.products = data;
      console.log(this.products);
    });
  }

  more(id){
    this.router.navigate(['proinfo',id]);
  }

}
