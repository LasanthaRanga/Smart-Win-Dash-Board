import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activenode',
  templateUrl: './activenode.component.html',
  styleUrls: ['./activenode.component.css']
})
export class ActivenodeComponent implements OnInit {

  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  prodUrl = environment.apiUrl + 'prod/'

  swid;
  freePins;
  aPin;
  prodList;
  product;
  firstPay;

  isClicked = true;

  user;

  constructor(private api: ApicallServiceService, private router: Router) { 
    this.user = api.getLogUser();
    this.swid=this.user['uid'];
    //this.swid=1133;
    this.loadPlaceMent();
  }

  loadPlaceMent() {
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

  ngOnInit(): void {
  }

  save(){

    if(this.firstPay >= 7000){
      
    let obj = {
      swid: this.swid,
      aPin: this.aPin,
      product: this.product,
      firstPay: this.firstPay,
      ptype:2
    }

    if (obj.swid && obj.aPin, obj.firstPay > 0) {
      this.isClicked = false;
      console.log(obj);

      localStorage.setItem('objx2',JSON.stringify(obj));
      localStorage.setItem('type',"2");

      this.api.showNotification('success', 'Activated ');

      this.router.navigate(['product']);
    } else {
      this.api.showNotification('warning', 'Please Check Values');
    }

    }else{
      this.api.showNotification('warning', 'Please Check first Pay');
    }

  }



}
