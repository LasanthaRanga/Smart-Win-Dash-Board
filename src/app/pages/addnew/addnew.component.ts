import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  urlProd = environment.apiUrl + 'prod/'
  products;
  pin;
  message;
  keyList;
  can = false;
  isClicked = true;
  selectedProduct;

  side;

  constructor(private api: ApicallServiceService, private arout: ActivatedRoute, private rout: Router) { }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      this.pin = params['id'];
      console.log(this.pin);
      if (this.pin) {
        this.loadPlaceMent();
        this.loadProducts();
        this.getUserKeyList();
      }
    });
  }

  getUserKeyList() {
    this.api.post(this.url + 'getUserKeys', {}, data => {
      this.keyList = data;
      console.log(this.keyList);
    });
  }

  selectProd(prod) {
    this.selectedProduct = prod;
  }

  unSelect() {
    this.selectedProduct = null;
  }

  loadPlaceMent() {
    // commitionId
    this.api.post(this.treeUrl + 'canAdd', { treeId: this.pin }, data => {
      if (data.treeId > 0) {
        if (data.sidA || data.sidB) {
          this.api.showNotification('success', 'Placement found');

          this.message = 'Placement found'

          if (data.sidA) {
            this.side = 'A';
            this.can = true;
          } else if (data.sidB) {
            this.side = 'B';
            this.can = true;
          } else {
            this.side = null;
            this.can = false;
            this.message = 'Cannot Add Pins Are Full'
            this.rout.navigate(['/'])
          }

        } else {
          this.api.showNotification('warning', 'Both Sides Are Full');
          this.can = false;
          this.message = 'Cannot Add Pins Are Full'
          this.rout.navigate(['/'])
        }
      } else {
        this.api.showNotification('danger', 'Please Check Pin ID');
        this.message = 'Cannot Add Pins Are Full'
        this.can = false;
        this.rout.navigate(['/'])
      }
      console.log(data);
    });
  }

  loadProducts() {
    this.api.post(this.urlProd + 'getAllProduct', {}, data => {
      this.products = data;
      console.log(this.products);
    });
  }


  save() {
    console.log(this.keyList);
    this.rout.navigate(['/onpay'])
  }

  getDataByPin() {

  }

}
