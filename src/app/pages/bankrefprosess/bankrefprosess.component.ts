import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'environments/environment'
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bankrefprosess',
  templateUrl: './bankrefprosess.component.html',
  styleUrls: ['./bankrefprosess.component.css']
})
export class BankrefprosessComponent implements OnInit {

  urlonpay = environment.apiUrl + 'onpay/'
  treeUrl = environment.apiUrl + 'tree/'

  displayedColumns: string[] = ['value', 'prodName', 'amount', 'id'];
  dataSource = <any>[];

  displayedColumnscom: string[] = ['value', 'prodName', 'amount', 'id'];
  dataSourcecom = <any>[];

  //@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // @ViewChild(MatPaginator, { static: false }) paginatorpen: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortpen: MatSort;

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('paginatorpen', { static: true }) paginatorpen: MatPaginator;


  name;
  product;
  ref;
  payamount;
  obj;
  metaid;
  id;
  img;
  paytype;
  sysref;
  cusdydref;

  isselect = false;
  isselectcom = false;


  cname;
  cproduct;
  cref;
  cpayamount;
  cimg;
  csysref;
  ccusdydref;
  datacount = false;


  // todayNumber: number = Date.now();
  // todayDate : Date = new Date();
  // todayString : string = new Date().toDateString();
  // todayISOString : string = new Date().toISOString();

  pipe = new DatePipe('en-US'); // Use your own locale
  myFormattedDate;

  refnumber;

  inputval;


  constructor(private api: ApicallServiceService, private http: HttpClient) {
    this.loadlist();
    this.loadcomlist();
    // const now = Date.now();
    // this.myFormattedDate = this.pipe.transform(now, 'yy-MM-dd');


  }

  ngOnInit(): void {
  }

  loadlist() {
    this.api.post(this.urlonpay + 'pendinglist', {}, data => {
      let count = data.length;
      //this.datacount=data.length;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginatorpen;
      this.dataSource.sort = this.sortpen;

      if (count > 0) {
        this.datacount = true;
      } else {
        this.datacount = false;
      }
    });
  }

  loadcomlist() {
    this.api.post(this.urlonpay + 'comlist', {}, data => {
      this.dataSourcecom = new MatTableDataSource(data);
      this.dataSourcecom.paginator = this.paginator;
      this.dataSourcecom.sort = this.sort;
    });
  }

  get(id) {
    console.log(id);

    this.api.post(this.urlonpay + 'pendinglistall', {
      id: id
    }, data => {
      this.name = data[0].valu;
      this.product = data[0].prodName;
      this.ref = data[0].refno;
      this.payamount = data[0].amount;
      this.metaid = data[0].metaid;
      this.id = id;
      let name = data[0].img_path;
      this.img = 'https://smartwinent.com/recipt/' + name;
      this.paytype = data[0].typeid;
      this.sysref = data[0].sys_ref_no;
      this.cusdydref = data[0].cus_sys_ref_no;
      console.log(this.metaid);
      console.log(data);
      this.myFormattedDate =
        this.isselect = true;
    });
  }


  getcom(id) {
    console.log(id);

    this.api.post(this.urlonpay + 'com_all', {
      id: id
    }, data => {
      this.cname = data[0].valu;
      this.cproduct = data[0].prodName;
      this.cref = data[0].refno;
      this.cpayamount = data[0].amount;
      this.metaid = data[0].metaid;
      //this.id = id;
      let name = data[0].img_path;
      this.cimg = 'https://smartwinent.com/recipt/' + name;
      this.paytype = data[0].typeid;
      this.csysref = data[0].sys_ref_no;
      this.ccusdydref = data[0].cus_sys_ref_no;
      console.log(this.metaid);
      console.log(data);
      this.isselectcom = true;
      this.refnumber = this
    });
  }

  process() {
    this.isselect = false;
    let headers = new HttpHeaders().set('content-typecontent-type', 'application/json').set('X-Master-Key', '$2b$10$TGHRHtoAyicR0JES3sAV.eHNrbcGO.34wWRbHuhvJoOK/yN63kkNC');

    this.http.get('https://api.jsonbin.io/v3/b/' + this.metaid, { 'headers': headers }).subscribe(data => {// json data get
      console.log(data)
      console.log(data['metadata'].id);
      this.obj = data['record'];
      console.log("$$$$$$$$");
      console.log( this.obj);
      console.log("$$$$$$$$");
      console.log(this.paytype);


      if (this.paytype == 1) {

        this.api.post(this.treeUrl + 'newNode', this.obj, res => {
          this.api.post(this.urlonpay + 'updatestatus', {
            id: this.id
          }, data => {
            this.api.showNotification('success', 'Process complete');
            this.loadlist();
            this.loadcomlist();
          });
        });


      } else if (this.paytype == 2) {


        this.api.post(this.treeUrl + 'activeNode', this.obj,
          data => {
            this.api.post(this.urlonpay + 'updatestatus', {
              id: this.id
            }, data => {
              this.api.showNotification('success', 'Process complete');
              this.loadlist();
              this.loadcomlist();
              this.isselect = false;
            });
          });

      }

    })
  }

  applayFilter(text) {
    this.dataSourcecom.filter = text.trim().toLocaleLowerCase();
  }


  create_ref_no(id) {

  }


  deletes() {
    this.isselect = false;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {


        //delite
        this.api.post(this.urlonpay + 'del', {
          id: this.id
        }, res => {
          this.loadlist();
          this.loadcomlist();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        });
      }
    })
  }

}
