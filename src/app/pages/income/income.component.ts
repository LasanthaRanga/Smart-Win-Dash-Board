import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  url = environment.apiUrl + 'user/';
  treeUrl = environment.apiUrl + 'tree/';
  urlInvoice = environment.apiUrl + 'invoice/';
  processID = 0;

  poinArray;
  introArray;
  pointTot = 0;
  inroTot = 0;
  user;

  pointExpenses;
  pointXtot = 0;
  introExpenses;
  pointItot = 0;

  balance = 0;

  from;
  to;

  totals = [];
  filterdTotals = [];
  min = 0;

  displayedColumns: string[] = ['dateTime', 'idProcess'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private api: ApicallServiceService,
    private arout: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  filter() {
    this.getPointComDates();
  }

  getPointComDates() {
    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');
    this.api.post(
      this.urlInvoice + 'getFullIncom',
      { from: datef, to: datet },
      (data) => {
        this.introArray = data;
        console.log(data);
        this.pointTotCal();
      }
    );
  }

  totalCommitionByDateRange() {
    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');
    this.api.post(
      this.urlInvoice + 'totalCommitionByDateRange',
      { from: datef, to: datet },
      (data) => {
        this.totals = data;
        this.filterByMin();
        console.log(this.totals);
      }
    );
  }

  pointTotCal() {
    this.pointTot = 0;
    this.introArray.forEach((element) => {
      this.pointTot += element.totalValue;
    });
    this.getPointExpense();
  }

  getPointExpense() {
    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');
    this.api.post(
      this.urlInvoice + 'getPointExpenses',
      { from: datef, to: datet },
      (data) => {
        this.pointExpenses = data;
        console.log(data);
        this.pointXTotCal();
      }
    );
  }

  pointXTotCal() {
    this.pointXtot = 0;
    this.pointExpenses.forEach((element) => {
      this.pointXtot += element.amount;
    });
    this.getIntoExpense();
  }

  getIntoExpense() {
    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');
    this.api.post(
      this.urlInvoice + 'getCommitionExpenses',
      { from: datef, to: datet },
      (data) => {
        this.introExpenses = data;
        console.log(data);
        this.pointITotCal();
      }
    );
  }

  pointITotCal() {
    this.pointItot = 0;
    this.introExpenses.forEach((element) => {
      this.pointItot += element.amount;
    });
    this.balanceCal();
  }

  balanceCal() {
    this.balance = this.pointTot - (this.pointXtot + this.pointItot);
  }
  filterByMin() {
    console.log(this.min);
    this.filterdTotals = this.totals.filter((el) => el.TOTAL > this.min);
  }
}
