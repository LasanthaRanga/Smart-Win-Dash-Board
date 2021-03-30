import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  urlProd = environment.apiUrl + 'prod/'
  products;
  constructor(private api: ApicallServiceService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.api.post(this.urlProd + 'getAllProduct', {}, data => {
      this.products = data;
      console.log(this.products);
    });
  }

}
