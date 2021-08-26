import { Component, OnInit } from '@angular/core';

import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  url = environment.apiUrl + 'tree/'


  myArray = [];
  user;
  isLoading = true;
  treeData;
  constructor(private api: ApicallServiceService) {
    this.user = api.getLogUser();
    console.log(this.user);
  }



  ngOnInit(): void {
    this.api.post(this.url + 'getCurrent', { uid: this.user.uid }, data => {
      this.treeData = data;
      console.log(this.treeData[0].swTreeId);
      window.location.href = 'https://sw.smartwinent.com/chart?data=' + this.treeData[0].swTreeId;
      // window.location.href = 'http://localhost/chart?data=' + this.treeData[0].swTreeId;
    });
  }





}
