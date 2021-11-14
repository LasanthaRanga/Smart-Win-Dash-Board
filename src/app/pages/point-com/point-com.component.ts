import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-point-com',
  templateUrl: './point-com.component.html',
  styleUrls: ['./point-com.component.css']
})
export class PointComComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  processID = 0;
  date;
  cdate;

  poinArray;
  introArray;
  pointTot = 0;
  inroTot = 0;

  pointComRady = false;
  introComRady = false;

  displayedColumns: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  dataSource = <any>[];
  dataSource2 = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;

  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) { }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      const id = params['id'];
      this.processID = id;
      this.getProcessData();
      this.getPointCom();
      this.getIntroCom();

      console.log(id);
    });

  }

  changeDate() {
    console.log(this.cdate);
    this.api.post(this.treeUrl + 'updateProcessDate', { id: this.processID, day: this.cdate }, data => {
      this.date = this.cdate;
    });

  }

  getProcessData() {
    this.api.post(this.treeUrl + 'getProcessDate', { id: this.processID }, data => {
      console.log(data);
      this.date = data.dateTime;
    });
  }

  getPointCom() {
    this.api.post(this.treeUrl + 'getPointCommitonList', { processID: this.processID }, data => {
      this.poinArray = data;
      // console.log(data);
      this.pointTotCal();
      this.getPointComToTable();
    });
  }

  getPointComToTable() {
    this.api.post(this.treeUrl + 'getPointCommitonListToTable', { processID: this.processID }, data => {
      this.dataSource = data;
      this.pointComRady = true;
    });
  }

  ExportTOExcel(sheetName) {
    let day = new Date();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource);

    ws['!cols'] = [
      { wch: 3.75 },
      { wch: 3.75 },
      { wch: 2.75 },
      { wch: 2.75 },
      { wch: 11.75 },
      { wch: 19.75 },
      { wch: 1.75 },
      { wch: 0.75 },
      { wch: 11.75 },
      { wch: 14.75 },
      { wch: 14.75 },
      { wch: 5.75 },
      { wch: 5.75 }
    ];



    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    /* save to file */
    XLSX.writeFile(wb, day + "--" + sheetName + '.xlsx');
  }


  ExportTOExcelIntro(sheetName) {
    let day = new Date();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource2);
    ws['!cols'] = [
      { wch: 3.75 },
      { wch: 3.75 },
      { wch: 2.75 },
      { wch: 2.75 },
      { wch: 11.75 },
      { wch: 19.75 },
      { wch: 1.75 },
      { wch: 0.75 },
      { wch: 11.75 },
      { wch: 14.75 },
      { wch: 14.75 },
      { wch: 5.75 },
      { wch: 5.75 }
    ];
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    /* save to file */
    XLSX.writeFile(wb, day + "--" + sheetName + '.xlsx');
  }


  getIntroCom() {
    this.api.post(this.treeUrl + 'getIntroCommitonList', { processID: this.processID }, data => {
      this.introArray = data;
      // console.log(data);
      this.getIntroComToTable();
      this.introTotCal();
    });
  }

  getIntroComToTable() {
    this.api.post(this.treeUrl + 'getIntroCommitonListToTable', { processID: this.processID }, data => {
      this.dataSource2 = data;
      this.introComRady = true;
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
