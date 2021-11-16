import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css']
})
export class OdersComponent implements OnInit {

  tid;
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  prodUrl = environment.apiUrl + 'prod/'

  userData;
  product;

  issued;
  messagesForSend;
  msg;

  allMessages;

  prodList;
  selectedProd;
  comment = '';
  user;

  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) { }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {

      this.user = this.api.getLogUser();

      console.log(this.user);

      const id = params['id'];
      this.tid = id;
      console.log(id);
      this.getUserData();
      this.getProductData();
      // this.loadMassagesToSend();
      // this.getAllMessages();
      this.getAllProduct();
    });

  }

  getUserData() {
    this.api.post(this.url + 'getUserDataByPin', { tid: this.tid }, data => {
      this.userData = data;
      console.log(this.userData);
    });
  }


  getProductData() {
    this.api.post(this.prodUrl + 'getProductByPin', { tid: this.tid }, data => {
      console.log("-----------------------------------");
      console.log(data);
      console.log("-----------------------------------");
      this.product = data[0];
      if (this.product.other2 == 0) {
        this.issued = false;
      } else {
        this.issued = true;
      }
      console.log(this.product);
    });
  }

  changeStatus() {
    console.log("change");
    console.log(this.issued);
    let status;
    if (this.issued) {
      status = 1;
    } else {
      status = 0;
    }

    this.api.post(this.prodUrl + 'setProductIssuStatus', { tid: this.tid, status: status }, data => {
      console.log(data);

      this.api.showNotification('success', 'Change');

    });
  }


  loadMassagesToSend() {
    this.api.post(this.prodUrl + 'getMassagesForSend', {}, data => {
      console.log(data);
      this.messagesForSend = data;
    });
  }

  selectMessage() {
    console.log(this.msg);
  }

  send() {
    console.log("SEND");
    let obj = {
      uid: this.userData[0].userId,
      tid: this.tid,
      prodid: this.product.idProd,
      date: '',
      msg: this.msg,
      status: this.msg.status,
      sttext: this.msg.status_text,
    }

    //sendMassage
    this.api.post(this.prodUrl + 'sendMassage', obj, data => {
      console.log(data);
      this.api.showNotification('success', 'Message Sent');
      // this.getAllMessages();
    });

  }



  // getAllMessages() {
  //   this.api.post(this.prodUrl + 'getAllSent', { tid: this.tid }, data => {
  //     this.allMessages = data;
  //     console.log(this.allMessages);
  //   });
  // }


  getAllProduct() {
    this.api.post(this.prodUrl + 'getAllProduct', {}, data => {
      this.prodList = data;
      console.log("====================")
      console.log(this.prodList)
      console.log("====================")
    });
  }


  changeProductOnInvoice() {

    if (this.selectedProd && this.comment.length > 3) {

      let day = new Date();
      this.comment += "  -  User id: " + this.user.uid + "  -  " + day;

      this.api.post(this.prodUrl + 'changeProductOnInvoice', { pid: this.selectedProd, comment: this.comment, tid: this.tid }, data => {
        this.getProductData();
      });
    } else {
      this.api.showNotification('warning', 'Check The Data');
    }


  }





}
