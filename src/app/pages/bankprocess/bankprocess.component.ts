import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bankprocess',
  templateUrl: './bankprocess.component.html',
  styleUrls: ['./bankprocess.component.css']
})
export class BankprocessComponent implements OnInit {


  user;
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  refList;

  ptype = 1;
  selectedRef;

  constructor(private api: ApicallServiceService, private router: Router) {
    this.user = api.getLogUser();

  }

  ngOnInit(): void {
    this.getMyref(1);
  }
  statusChange() {
    this.getMyref(this.ptype)
  }
  getMyref(status) {
    this.api.post(this.url + "allBankRef", { uid: this.user.uid, status: status, type: 'b' }, data => {
      this.refList = data;
      console.log(this.refList);
    })
  }

  goToFormTwo(id) {
    localStorage.removeItem('refid');
    this.router.navigate(['/formTwo/' + id + "/ref"]);
  }

  runProcess(ref) {
    this.api.post(this.url + "getBankRefarance", { ref: ref }, data => {
      this.selectedRef = data[0];

      this.api.post(this.url + "getTempData", { ref: ref }, temp => {
        const kl = temp;
        const obj = {
          ref: this.selectedRef.id,
          vlaues: kl,
          // purchaser: prop,
          introUid: this.selectedRef.iSWno,
          aPin: this.selectedRef.aPin,
          aPinUid: this.selectedRef.aPinUid,
          side: this.selectedRef.side,
          type: "owner",
          product: this.selectedRef.product,
          firstPay: this.selectedRef.price,
          status: 0,
          otherint1: this.selectedRef.otherint1,
          otherint2: this.selectedRef.otherint2,
          otherstring1: '',
          otherstring2: '',


        }
        console.log(obj);
        this.api.post(this.treeUrl + 'newNode', obj, res => {
          this.api.showNotification('success', 'All Done');
          this.api.post(this.url + "completeBankPros", { ref: ref }, data => {
            this.getMyref(1);
          });        
        });
      });
    })
  }

  reject(ref) {
    this.api.post(this.url + "rejectBankPros", { ref: ref }, data => {
      this.getMyref(1);
    })
  }

}
