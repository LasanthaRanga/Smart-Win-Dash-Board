import { Component, OnInit } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { off } from 'process';
import { Router } from '@angular/router';


@Component({
  selector: 'app-conpay',
  templateUrl: './conpay.component.html',
  styleUrls: ['./conpay.component.css']
})
export class ConpayComponent implements OnInit {

  treeUrl = environment.apiUrl + 'tree/'

  constructor(private api: ApicallServiceService ,private router: Router) {

   }

  ngOnInit(): void {

    var type = localStorage.getItem('type');
    if(type == '1'){
      this.save_tree();

    }else if(type == '2'){
      this.active_dummy();
    }

  }

  save_tree(){
    let obj =JSON.parse(localStorage.getItem('objx'));
    this.api.post(this.treeUrl + 'newNode', obj, res => {
    this.api.showNotification('success', 'All Done');
    this.router.navigate(['home']);
   });
 }

 active_dummy(){

  let obj =JSON.parse(localStorage.getItem('objx2'));
  this.api.post(this.treeUrl + 'activeNode',obj,
       data => {
          this.api.showNotification('success', 'All Done'); 
          this.router.navigate(['home']);
      });
 }

}
