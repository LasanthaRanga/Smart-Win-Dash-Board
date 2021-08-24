import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  prodUrl = environment.apiUrl + 'prod/'

  user;
  pins;
  val;

  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.api.getLogUser()
    console.log(this.user);
    console.log(this.user.uid);
    this.getAllPins();
  }


  getAllPins() {
    this.api.post(this.prodUrl + 'getAllNotificationsByUserID', { uid: this.user.uid }, data => {
      this.pins = data;
      console.log(this.pins);
    });
  }


  send(pin) {
    console.log(pin);

    let last = pin.layar.pop();
    console.log(last);
    try {
      const pipe = new DatePipe('en-US');
      const datef = pipe.transform(pin.B, 'yyyy-MM-dd');
      const dd = new Date();

      const ddd = pipe.transform(dd.setMonth(dd.getMonth() + 3), "yyyy-MM-dd");
      console.log(ddd);

      if (datef < ddd) {
        if (pin.B && datef.length > 7) {
          if (last) {
            let obj = {
              uid: this.user.uid,
              tid: pin.swTreeId,
              prodid: last.idProd,
              date: datef,
              msg: "   ",
              status: 2,
              sttext: "pending",
            }
            this.api.post(this.prodUrl + 'sendMassagePending', obj, data => {
              console.log(data);
              this.api.showNotification('success', 'Message Sent');
            });
          }
        } else {
          this.api.showNotification('warning', 'Please Enter Correct Data');
        }

      } else {
        this.api.showNotification('warning', 'Please select less than 3 month date');
      }
    } catch (error) {
      console.log(error);
    }

    this.getAllPins();

  }



}
