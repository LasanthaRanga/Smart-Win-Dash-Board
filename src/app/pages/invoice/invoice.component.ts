import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  urlInvoice = environment.apiUrl + 'invoice/'

  displayedColumns: string[] = ['idUser', 'value', 'pin','totalValue', 'idInvoice'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;



  inputval;

  constructor(private api: ApicallServiceService, private http: HttpClient, private router: Router) {
    this.loadAllInvoice();

  }

  ngOnInit(): void {

  }

  loadAllInvoice() {

    this.http.post<any>(this.urlInvoice + 'getAllInvoice', {}).subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }





}
