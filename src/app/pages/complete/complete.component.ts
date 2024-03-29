import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
import { noConflict } from 'jquery';
import { localeData } from 'moment';
@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {


  urlInvoice = environment.apiUrl + 'invoice/'
  url = environment.apiUrl + 'user/'
  pin;

  sum = 0;
  prodvalue = 0;
  prod;
  dev = 0;
  uid;
  userData;
  list;

  next = false;
  amount;
  constructor(private arout: ActivatedRoute, private api: ApicallServiceService, private router: Router) { }



  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      const id = params['id'];
      this.pin = id;
      this.getBalance();
    });
  }


  getBalance() {
    this.api.post(this.urlInvoice + 'getTotPaid', { pin: this.pin }, data => {
      console.log(data);
      this.sum = data[0].sum;
      this.prodvalue = data[0].prodPrice;
      this.dev = this.prodvalue - this.sum;
      this.uid = data[0].userId;
      this.prod = data[0].productId;
      this.api.post(this.url + 'searchUserById', { uid: this.uid }, udata => {
        this.userData = udata;
        console.log(this.userData);
      });

    });
    this.getPaidList();
  }

  getPaidList() {
    this.api.post(this.urlInvoice + 'getInvoicePayment', { pin: this.pin }, data => {
      this.list = data;
      console.log(this.list);
    });
  }

  getNext() {
    this.next = true;
  }


  payNow() {
    if (this.amount && this.amount > 0) {
      const obj = {
        amount: this.amount,
        pin: this.pin,
        prod: this.prod,
        uid: this.uid
      };

      if (obj.amount && obj.pin && obj.prod && obj.uid) {
        this.api.post(this.urlInvoice + 'newInvoice', obj, data => {
          console.log('-------------------');
          console.log(data);
          console.log(data.insertId);
          this.rePrint(data.insertId);
          console.log('-------------------');

          if (data) {
            this.api.showNotification('success', 'Something Wrong');
            this.next = false;
            this.getBalance();
          }
        });
      } else {
        this.api.showNotification('warning', 'Something Wrong');
      }
    } else {
      this.api.showNotification('warning', 'Check Payment Amount');
    }
  }


  rePrint(idInvoice) {
    this.api.post(this.urlInvoice + 'getInvoiceData', { id: idInvoice }, data => {
      let obj = {
        id: '',
        name: '',
        from: '',
        item: '',
        amount: '',
        date: '',
        mobile: ''
      }



      data.forEach(el => {
        console.log(el);
        if (el.keyId == 2) {
          obj.id = el.idInvoice;
          obj.name = el.value;
          obj.amount = el.totalValue;
          obj.item = el.prodName;
          obj.date = el.date;

        };

        if (el.keyId == 9) {
          obj.mobile = el.value;
        };

        if (el.keyId == 5) {
          obj.from += el.value;
        };

        if (el.keyId == 6 || el.keyId == 7) {
          obj.from += ", " + el.value;
        };

      });

      let mobile = obj.mobile;
      let mg = 'Thank you ' + obj.name + ' for your payment of LKR ' + obj.amount + ' in respect of SMART WIN ENTREPRENEUR (ptv) Ltd. INV No. ' + obj.id;

      this.api.post(this.url + 'singalMessage', { message: mg, mob: mobile }, data => {

        console.log(data);

      });


      console.log(obj);
      window.location.href = 'https://sw.smartwinent.com/invoice?data=' + JSON.stringify(obj);
    });


  }

  gotoIssue() {
    console.log(this.pin);
    this.router.navigate(['oder', this.pin])
  }

}
