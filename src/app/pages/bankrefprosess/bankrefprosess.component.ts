import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'environments/environment'
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bankrefprosess',
  templateUrl: './bankrefprosess.component.html',
  styleUrls: ['./bankrefprosess.component.css']
})
export class BankrefprosessComponent implements OnInit {

  urlonpay = environment.apiUrl + 'onpay/'
  treeUrl = environment.apiUrl + 'tree/'

  displayedColumns: string[] = ['value', 'prodName', 'amount','id'];
  dataSource = <any>[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  name;
  product;
  ref;
  payamount;
  obj;
  metaid;
  id;
 
isselect=false;
  constructor(private api: ApicallServiceService,private http: HttpClient) { 
    this.loadlist();
  }

  ngOnInit(): void {
  }

  loadlist(){
    this.api.post(this.urlonpay + 'pendinglist', {}, data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  get(id){
    console.log(id);

    this.api.post(this.urlonpay + 'pendinglistall', {
      id:id
    }, data => {
     this.name=data[0].VALUE;
     this.product=data[0].prodName;
     this.ref=data[0].refno;
     this.payamount=data[0].amount;
     this.metaid=data[0].metaid;
     this.id=id;
     console.log(this.metaid);
     this.isselect=true;
    });
  }

  process(){
    let headers = new HttpHeaders().set('content-typecontent-type', 'application/json').set('X-Master-Key', '$2b$10$TGHRHtoAyicR0JES3sAV.eHNrbcGO.34wWRbHuhvJoOK/yN63kkNC');

    this.http.get('https://api.jsonbin.io/v3/b/' + this.metaid, { 'headers': headers }).subscribe(data => {// json data get
    console.log(data)
    console.log(data['metadata'].id);
    this.obj=data['record'];

    this.api.post(this.treeUrl + 'newNode', this.obj, res => {
  

    this.api.post(this.urlonpay + 'updatestatus', {
      id:this.id
    }, data => {
      this.api.showNotification('success', 'Process complete');
      this.loadlist();
      this.isselect=false;
    });
   });

  })

  }

}
