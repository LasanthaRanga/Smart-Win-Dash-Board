import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-myincome',
  templateUrl: './myincome.component.html',
  styleUrls: ['./myincome.component.css']
})
export class MyincomeComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  processID = 0;

  poinArray;
  introArray;
  pointTot = 0;
  inroTot = 0;
  user;

  from;
  to;

  displayedColumns: string[] = ['dateTime', 'idProcess'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.api.getLogUser();
    if (this.user) {
      this.getPointCom();
      this.getIntroCom();
    }
  }

  getPointCom() {
    this.api.post(this.treeUrl + 'getPointCommitonByUser', { uid: this.user.uid }, data => {
      this.poinArray = data;
      console.log(data);
      this.pointTotCal();
    });
  }

  getIntroCom() {
    this.api.post(this.treeUrl + 'getIntroCommitonByUser', { uid: this.user.uid }, data => {
      this.introArray = data;
      console.log(data);
      this.introTotCal();
    });
  }

  pointTotCal() {
    this.pointTot = 0;
    this.poinArray.forEach(element => {
      this.pointTot += element.amount;
    });
  }

  introTotCal() {
    this.inroTot = 0;
    this.introArray.forEach(element => {
      this.inroTot += element.amount;
    });
  }

  filter() {
    this.getIntroComDates();
    this.getPointComDates();
  }

  getPointComDates() {

    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');

    console.log(datef);

    this.api.post(this.treeUrl + 'getPointCommitonByUserDates', { uid: this.user.uid, from: datef, to: datet }, data => {
      this.poinArray = data;
      console.log(data);
      this.pointTotCal();
    });
  }

  getIntroComDates() {
    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');

    this.api.post(this.treeUrl + 'getIntroCommitonByUserDates', { uid: this.user.uid, from: datef, to: datet }, data => {
      this.introArray = data;
      console.log(data);
      this.introTotCal();
    });
  }

}
