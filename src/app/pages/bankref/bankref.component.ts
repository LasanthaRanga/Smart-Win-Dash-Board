import { Component, OnInit } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bankref',
  templateUrl: './bankref.component.html',
  styleUrls: ['./bankref.component.css']
})
export class BankrefComponent implements OnInit {

  urlonpay = environment.apiUrl + 'onpay/'
  urlUpload = environment.apiUrl + 'up/'
  urlinvoice = environment.apiUrl + 'invoice/'

  ref;
  reflist;
  Amount;
  refno;
  sysrefno;

  user;

  isLoading;
  selectedFile;
  upProgrus;
  fileType;
  url;
  urlbtn = false;

  isafterupload = false;

  reflists;
  favoriteSeason;

  constructor(private api: ApicallServiceService, private http: HttpClient, private router: Router) {
    this.user = api.getLogUser();
    this.loadlist();
    this.getreflist();
  }

  ngOnInit(): void {
  }

  save() {

    this.api.post(this.urlonpay + 'refcount', {
      refno: this.refno
    }, data => {

      var count = data[0].count;
      console.log(count);
      if (count == 0) {

        if (this.refno && this.ref && this.sysrefno && this.sysrefno) {
          this.api.post(this.urlonpay + 'updateref', {
            refno: this.refno,
            id: this.ref,
            sys_ref_no: this.sysrefno
          }, data => {
            this.refno = "";
            this.Amount = "";
            this.sysrefno = "";
            this.api.showNotification('success', 'All done!!!');
            this.router.navigate(['home']);
            this.loadlist();
          });
        } else {
          this.api.showNotification('warning', 'Please Check Values');
        }

      } else {
        this.api.showNotification('warning', 'Duplicate bank referance');
      }
    });
  }


  loaddetails() {
    this.api.post(this.urlonpay + 'bankreflistmore', {
      uid: this.user['uid'],
      refid: this.ref
    }, data => {
      this.Amount = data[0].amount;
    });

  }

  


  loadlist() {
    this.api.post(this.urlonpay + 'bankreflist', {
      uid: this.user['uid']
    }, data => {
      this.reflist = data;
      console.log("-------------------------------------");
      console.log(this.reflist);
      console.log("-------------------------------------");
    });

  }

  onUpload() {
    this.isLoading = true;
    const fd = new FormData();

    fd.append('pid', this.ref);

    if (this.selectedFile != null) {
      fd.append('attach', this.selectedFile, this.selectedFile.name);
    }

    this.http.post(this.urlUpload + 'uploadres', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.upProgrus = Math.round(events.loaded / events.total * 100);
        if (this.upProgrus === 100) {

          this.api.showNotification('success', 'Image Uploaded');
          this.urlbtn = false;
          //this.router.navigate(['home']);
          this.isLoading = false;
          this.isafterupload = true;
        }
      } else if (events.type === HttpEventType.Response) {
        console.log(events);
      }
    });


  }


  setno(id){
    console.log("xxxxxx");
    console.log(id);
    console.log("xxxxxx");
  }



  onFileSelected(event) {
    this.urlbtn = true;
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (imgsrc: any) => { // called once readAsDataURL is completed
      this.fileType = this.selectedFile.type;
      if (this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png') {
        this.url = imgsrc.target.result;
      } else {
        this.url = '../assets/img/noimage.jpg';
      }
    };

    // console.log(event);
  }


  getreflist(){
    this.api.post(this.urlinvoice + 'getreflist', {
      uid: this.user['uid']
    }, data => {
      this.reflists = data;
      console.log("----xxxx------");
      console.log(data);
      console.log("----xxxx------");
    });
  }

}
