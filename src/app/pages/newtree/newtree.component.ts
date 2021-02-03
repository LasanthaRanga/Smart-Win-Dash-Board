import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment'
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';

@Component({
  selector: 'app-newtree',
  templateUrl: './newtree.component.html',
  styleUrls: ['./newtree.component.scss']
})
export class NewtreeComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  prodUrl = environment.apiUrl + 'prod/'

  pin;
  side;
  point;

  constructor(private api: ApicallServiceService) {

  }

  ngOnInit() { }

  save() {
    const obj = {
      tid: this.pin,
      side: this.side,
      point: this.point
    }
    this.api.post(this.treeUrl + 'balancePoint', obj, data => {
      this.api.showNotification('success', 'Point  ' + this.pin + '  -  ' + this.side + '   -   ' + this.point);
    });
  }

}
