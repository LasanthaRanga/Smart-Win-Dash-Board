import { Component, OnInit } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
@Component({
  selector: 'app-newnod',
  templateUrl: './newnod.component.html',
  styleUrls: ['./newnod.component.css']
})
export class NewnodComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  prodUrl = environment.apiUrl + 'prod/'
  keyList;
  prodList;
  iSWno;
  iNidNo;
  iName;
  intoDuser;


  freePins;
  aPin;
  aName;
  aPlacementNo;
  side;
  type;
  placement;
  product;
  firstPay;

  cusName;
  cusAddressl1;
  cusAddressl2;
  cusAddressl3;
  cusCity;
  cusNic;
  cusTpno;
  cusProdName;

  isClicked = true;
  completedInfo;

  userData;
  findUserId;

  constructor(private api: ApicallServiceService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.api.post(this.prodUrl + 'getAllProduct', {}, data => {
      console.log(data);
      this.prodList = data;
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

  loadPlaceMent(event: any) {
    // commitionId
    this.api.post(this.treeUrl + 'canAdd', { treeId: this.aPin }, data => {
      if (data.treeId > 0) {
        if (data.sidA || data.sidB) {
          this.api.showNotification('success', 'Placement found');
          this.placement = data;
          this.aPlacementNo = data.userId;
          this.api.post(this.url + 'searchUserById', { uid: this.aPlacementNo }, dd => {
            console.log(dd);
            if (dd[0]) {
              this.aName = dd[1].value;
            }
          });
        } else {
          this.api.showNotification('warning', 'Both Sides Are Full');
        }
      } else {
        this.api.showNotification('danger', 'Please Check Pin ID');
      }
      console.log(data);
    });
  }

  loadPins() {
    this.api.post(this.treeUrl + 'getFreePins', { swid: this.aPlacementNo }, data => {
      this.freePins = data;
      if (data[0]) {
        console.log(this.freePins);
        this.api.showNotification('success', 'Placemants Redy');
      } else {
        this.api.showNotification('warning', 'No more Free Plasement Pins');
      }

    });
  }

  loadMember() {
    this.api.post(this.url + 'searchUserById', { uid: this.findUserId }, data => {
      this.userData = data;
      console.log(this.userData);
    });
  }

  save() {


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
          if (this.product) {
            if (this.firstPay > 0) {
              if (this.type) {
                if (this.type === 'other') {
                  if (prop.cusName && prop.cusAddressl1 &&
                    prop.cusAddressl2 && prop.cusAddressl3 &&
                    prop.cusCity && prop.cusNic && prop.cusTpno
                  ) {
                    // -----------
                    isValid = true;

                  } else {
                    this.api.showNotification('warning', 'please Check the Purchaser Details');
                  }
                } else {
                  isValid = true;
                  // ---------------
                }
              } else {
                this.api.showNotification('warning', 'please Check Proposer Or Purchaser');
              }
            } else {
              this.api.showNotification('warning', 'please Check the First Payment Rs');
            }
          } else {
            this.api.showNotification('warning', 'please Check the Product');
          }
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
      const obj = {
        vlaues: this.keyList,
        purchaser: prop,
        introUid: this.iSWno,
        aPin: this.aPin,
        aPinUid: this.aPlacementNo,
        side: this.side,
        type: this.type,
        product: this.product,
        firstPay: this.firstPay,
        userData: this.userData[0].userId
      }

      this.api.post(this.treeUrl + 'newPlacement', obj, dd => {
        console.log(dd);
      });

      console.log(obj);

    }

  }


}
