import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  prodUrl = environment.apiUrl + 'prod/'

  constructor(private api: ApicallServiceService) { }


  swid;
  freePins;
  aPin;
  prodList;
  product;
  firstPay;

  isClicked = true;

  ngOnInit(): void {
    this.getProductList();
  }

  loadPlaceMent(event: any) {
    this.api.post(this.treeUrl + 'getNotActive', { swid: this.swid }, data => {
      this.freePins = data;
      if (data[0]) {
        console.log(this.freePins);
        this.api.showNotification('success', 'Placemants Redy');
      } else {
        this.api.showNotification('warning', 'No more Free Plasement Pins');
      }

    });
  }

  getProductList() {
    this.api.post(this.prodUrl + 'getAllProduct', {}, data => {
      console.log(data);
      this.prodList = data;
    });
  }

  save() {

    let obj = {
      swid: this.swid,
      aPin: this.aPin,
      product: this.product,
      firstPay: this.firstPay
    }

    if (obj.swid && obj.aPin, obj.product, obj.firstPay > 0) {
      this.isClicked = false;
      this.api.post(this.treeUrl + 'activeNode', obj, data => {
        console.log(data);
        this.api.showNotification('success', 'Activated ');
        this.clear();
      });
    } else {
      this.api.showNotification('warning', 'Please Check Values');
    }

  }

  clear() {
    this.swid = null;
    this.freePins = null;
    this.aPin = null;
    this.prodList;
    this.product;
    this.firstPay = null;
    this.isClicked = true;
  }


}
