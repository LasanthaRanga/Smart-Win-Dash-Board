import { Component, OnInit } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bankref',
  templateUrl: './bankref.component.html',
  styleUrls: ['./bankref.component.css']
})
export class BankrefComponent implements OnInit {

  urlonpay = environment.apiUrl + 'onpay/'

  ref;
  reflist;
  Amount;
  refno;

  user;

  constructor(private api: ApicallServiceService) {
    this.user = api.getLogUser();
    this.loadlist();
   }

  ngOnInit(): void {
  }

  save(){

    this.api.post(this.urlonpay + 'updateref', {
      refno:this.refno,
      id:this.ref
       }, data => {
        this.refno="";
        this.Amount="";
        this.api.showNotification('success', 'Uploded');
        this.loadlist();
    });

  }


  loaddetails(){
    this.api.post(this.urlonpay + 'bankreflistmore', {
      uid:this.user['uid'],
      refid:this.ref
       }, data => {
        this.Amount=data[0].amount;
    });

  }

  loadlist(){
    this.api.post(this.urlonpay + 'bankreflist', {
      uid:this.user['uid']
       }, data => {
         this.reflist=data;
    });

  }

}
