import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  urlUsers = environment.apiUrl + 'user/'
  inputval

  displayedColumns: string[] = ['value', 'DAY', 'idUser',];
  dataSource = <any>[];

  dataSourcenic = <any>[];
  displayedColumnsnic: string[] = ['value', 'idUser'];

  niclist;
  inputvals;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private api: ApicallServiceService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.api.post(this.urlUsers + 'getUsersList', {}, data => {
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
    this.router.navigate(['user-profile', item.idUser])
  }

  getbynic(id) {
    this.api.post(this.urlUsers + 'getUsersListBYNic', { nic: id }, data => {
      this.dataSourcenic = new MatTableDataSource(data);
      this.dataSourcenic.paginator = this.paginator;
      console.log(this.niclist);
      console.log("#######");

    })
  }

}
