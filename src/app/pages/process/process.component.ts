import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  urlUsers = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  inputval

  processStarted = false;

  displayedColumns: string[] = ['dateTime', 'idProcess'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private api: ApicallServiceService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getProcess();
  }


  runProcess() {
    this.processStarted = true;
    this.api.post(this.treeUrl + 'process', {}, data => {
      console.log(data);
    })
  }

  getProcess() {
    this.api.post(this.treeUrl + 'getProcess', {}, data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applayFilter(text) {
    this.dataSource.filter = text.trim().toLocaleLowerCase();
  }

  selectOne(item) {
    console.log(item);
     this.router.navigate(['pointcom', item.idProcess])
  }

}
