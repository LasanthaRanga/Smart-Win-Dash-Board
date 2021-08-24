import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {

  urlTree = environment.apiUrl + 'tree/'
  inputval

  displayedColumns: string[] = ['value', 'swTreeId'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private api: ApicallServiceService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getPinList();
  }

  getPinList() {
    this.api.post(this.urlTree + 'getAllPins', {}, data => {
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
    this.router.navigate(['oder', item.swTreeId])
  }

}
