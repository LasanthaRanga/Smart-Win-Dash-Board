import { Component, OnInit } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-conpay',
  templateUrl: './conpay.component.html',
  styleUrls: ['./conpay.component.css']
})
export class ConpayComponent implements OnInit {

  treeUrl = environment.apiUrl + 'tree/'

  constructor(private api: ApicallServiceService) {

   }

  ngOnInit(): void {
    this.save_tree();
  }

  save_tree(){
    let obj =JSON.parse(localStorage.getItem('objx'));
    this.api.post(this.treeUrl + 'newNode', obj, res => {
    this.api.showNotification('success', 'All Done');
   });
 }

}
