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
  // urlProd = environment.apiUrl + 'prod/'
  products;
  pin;
  message;
  keyList;
  can = false;
  isClicked = true;
  intoDuser;
  iName;
  iNidNo;
  iSWno;
  selectedProduct;

  side;
  freePins;
  aPin;
  aName;
  aPlacementNo;
  type = "owner";
  placement;
  product;
  firstPay = 7000;
  obj;


  cusName;
  cusAddressl1;
  cusAddressl2;
  cusAddressl3;
  cusCity;
  cusNic;
  cusTpno;
  cusProdName;


  constructor(private api: ApicallServiceService, private arout: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      this.pin = params['id'];
      console.log(this.pin);
      if (this.pin) {
        this.loadPlaceMent();
        // this.loadProducts();
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

  loadIntroducer(event: any) {
    // searchUserById
    this.api.post(this.url + 'searchUserById', { uid: this.iSWno }, data => {
      console.log(data);
      if (data[0]) {
        this.intoDuser = data;

        this.intoDuser.forEach(el => {
          if (el.keyId === 2) {
            this.iName = el.value;
          }
          if (el.keyId === 21) {
            this.iNidNo = el.value;
          }
        });

        this.api.showNotification('success', 'Introducer found');
      } else {
        this.api.showNotification('warning', 'Please Check Introducer ID');
      }
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
          this.placement = data;
          this.message = 'Placement found'


          this.aPlacementNo = data.userId;
          this.aPin = data.treeId;

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
            this.router.navigate(['/'])
          }

        } else {
          this.api.showNotification('warning', 'Both Sides Are Full');
          this.can = false;
          this.message = 'Cannot Add Pins Are Full'
          this.router.navigate(['/'])
        }
      } else {
        this.api.showNotification('danger', 'Please Check Pin ID');
        this.message = 'Cannot Add Pins Are Full'
        this.can = false;
        this.router.navigate(['/'])
      }
      console.log(data);
    });
  }

  // loadProducts() {
  //   this.api.post(this.urlProd + 'getAllProduct', {}, data => {
  //     this.products = data;
  //     console.log(this.products);
  //   });
  // }


  save() {
    console.log(this.keyList);

    const prop = {
      cusName: this.cusName,
      cusAddressl1: this.cusAddressl1,
      cusAddressl2: this.cusAddressl2,
      cusAddressl3: this.cusAddressl3,
      cusCity: this.cusCity,
      cusNic: this.cusName,
      cusTpno: this.cusTpno
    }



    let isValid = false;
    if (this.intoDuser) {
      if (this.placement) {
        if (this.side) {
          // if (this.product) {
          if (this.firstPay >= 0) {
            if (this.type) {
              if (this.type === 'other') {
                if (prop.cusName && prop.cusAddressl1 &&
                  prop.cusAddressl2 && prop.cusAddressl3 &&
                  prop.cusCity && prop.cusNic && prop.cusTpno
                ) {
                  isValid = true;
                  this.keyList.forEach(element => {
                    if (!element.val) {
                      this.api.showNotification('warning', element.key + ' is Empty');
                      isValid = false;
                    }
                  });
                } else {
                  this.api.showNotification('warning', 'please Check the Purchaser Details');
                }
              } else {
                isValid = true;
                this.keyList.forEach(element => {
                  if (!element.val) {
                    this.api.showNotification('warning', element.key + ' is Empty');
                    isValid = false;
                  }
                });
              }
            } else {
              this.api.showNotification('warning', 'please Check Proposer Or Purchaser');
            }
          } else {
            this.api.showNotification('warning', 'please Check the First Payment Rs');
          }
          // } else {
          //   this.api.showNotification('warning', 'please Check the Product');
          // }
        } else {
          this.api.showNotification('warning', 'please Check the Side');
        }
      } else {
        this.api.showNotification('warning', 'please Check Placement Information');
      }
    } else {
      this.api.showNotification('warning', 'please Check Introducer Information');
    }


    if (isValid) {
      this.isClicked = false;
      this.obj = {
        vlaues: this.keyList,
        purchaser: prop,
        introUid: this.iSWno,
        aPin: this.aPin,
        aPinUid: this.aPlacementNo,
        side: this.side,
        type: this.type,
        product: '',
        firstPay: this.firstPay,
        ptype: 1
      }


      localStorage.setItem('objx', JSON.stringify(this.obj));
      sessionStorage.setItem('objx', JSON.stringify(this.obj));
      localStorage.setItem('type', "1");

      console.log('xxxxxxxxxx');
      console.log(this.obj);
      console.log('xxxxxxxxxx');
      this.api.showNotification('success', 'All Done');
      if ("objx" in localStorage && "type" in localStorage) {
        this.router.navigate(['product']);
      } else {
        alert('no');
      }

    }
  }

  getDataByPin() {

  }

}
