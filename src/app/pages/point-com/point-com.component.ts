import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-point-com',
  templateUrl: './point-com.component.html',
  styleUrls: ['./point-com.component.css']
})
export class PointComComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  processID = 0;

  poinArray;
  introArray;
  pointTot = 0;
  inroTot = 0;

  displayedColumns: string[] = ['dateTime', 'idProcess'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) { }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      const id = params['id'];
      this.processID = id;
      this.getPointCom();
      this.getIntroCom();
      console.log(id);
    });

  }

  getPointCom() {
    this.api.post(this.treeUrl + 'getPointCommitonList', { processID: this.processID }, data => {
      this.poinArray = data;
      console.log(data);
      this.pointTotCal();
    });
  }

  getIntroCom() {
    this.api.post(this.treeUrl + 'getIntroCommitonList', { processID: this.processID }, data => {
      this.introArray = data;
      console.log(data);
      this.introTotCal();
    });
  }

  pointTotCal() {
    this.poinArray.forEach(element => {
      this.pointTot += element.amount;
    });
  }

  introTotCal() {
    this.introArray.forEach(element => {
      this.inroTot += element.amount;
    });
  }

}
