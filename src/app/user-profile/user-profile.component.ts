import { Component, OnInit } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  user;
  userData;
  treeData = [];
  main;
  asid;
  bsid;
  hasTree = false;

  editable = false;
  selectedUser;

  selectedNod;
  newIntro;

  processID = 0;

  poinArray;
  introArray;
  pointTot = 0;
  inroTot = 0;

  from;
  to;

  selectedPin;
  pinIncome;


  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) { }

  ngOnInit() {


    this.arout.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.selectedUser = id;
        this.user = { id: this.selectedUser };
        this.loadSelectedUser(id);
        this.editable = true;
        if (this.api.getLogUser().uType != 1) {
          this.editable = false;
        }

      } else {
        this.user = this.api.getLogUser()
        console.log(this.user);
        this.loadUser();
      }
    });

  }

  loadUser() {
    this.api.post(this.url + 'searchUserById', { uid: this.user.uid }, data => {
      this.userData = data;
      console.log(this.userData);
      this.loadTreeData();
    });
  }

  loadSelectedUser(id) {
    this.api.post(this.url + 'searchUserById', { uid: id }, data => {
      this.userData = data;
      this.user.uid = id;
      console.log(this.userData);
      this.loadTreeData();
    });
  }

  loadTreeData() {
    // getCurrent
    this.api.post(this.treeUrl + 'getCurrent', { uid: this.user.uid }, data => {
      this.treeData = data;
      console.log(' -------- ');
      console.log(this.treeData);
      console.log('"---------------------------"');



      this.treeData.forEach(nod => {

        this.api.post(this.treeUrl + 'getCurrentPoint', { tid: nod.swTreeId, side: 'A', status: 1 }, d => {
          //   console.log(d);
          if (d.point != null) {
            nod.APoint = d.point;
          }
        });

        this.api.post(this.treeUrl + 'getCurrentPoint', { tid: nod.swTreeId, side: 'B', status: 1 }, d => {
          //  console.log(d);
          if (d.point != null) {
            nod.BPoint = d.point;
          }
        });

        this.api.post(this.treeUrl + 'getIntroduser', { comid: nod.commitionId }, d => {
          console.log(d);
          if (d[0]) {
            nod.other2 = d[0].value;
            nod.other1 = d[0].introducerid;
            console.log(nod);
          }
        });


      });




      this.hasTree = true;



    });
  }



  getCurrentPoint(id, s) {
    this.api.post(this.treeUrl + 'getCurrentPoint', { tid: id.swTreeId, side: s, status: 1 }, data => {

      if (data && data.point !== null) {
        console.log(data);
        if (s === 'A') {
          id.APoint = data.point;
        }
        if (s === 'B') {
          id.BPoint = data.point;
        }
      }
    });
  }

  update() {
    console.log(this.userData);
    this.api.post(this.url + 'update', { udata: this.userData }, data => {
      console.log(data);
      this.api.showNotification("success", "Updated");
    });
  }

  goToTree(pin) {
    window.location.href = 'https://sw.smartwinent.com/chart?data=' + pin;
  }

  change(nod) {
    console.log(nod);
    this.selectedNod = nod;
  }

  updateIntro() {
    console.log(this.selectedNod);
    console.log(this.newIntro);
    this.api.post(this.treeUrl + 'updateIntroduser', { newIntro: this.newIntro, comid: this.selectedNod.commitionId }, data => {
      console.log(data);
      if (data.status === 401) {
        this.api.showNotification('danger', 'Introducer Id is wrong');
      } else {
        this.api.showNotification('success', 'Introducer Updated');
        this.loadTreeData();
      }

    });


  }


  // =======================================

  pointTotCal() {
    this.pointTot = 0;
    this.poinArray.forEach(element => {
      this.pointTot += element.amount;
    });
  }

  introTotCal() {
    this.inroTot = 0;
    this.introArray.forEach(element => {
      this.inroTot += element.amount;
    });
  }

  filter() {
    this.getIntroComDates();
    this.getPointComDates();
  }

  getPointComDates() {
    this.poinArray = [];
    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');
    this.api.post(this.treeUrl + 'getPointCommitonByUserDates', { uid: this.user.uid, from: datef, to: datet }, data => {
      this.poinArray = data;
      console.log(data);
      this.pointTotCal();
    });
  }

  getIntroComDates() {
    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');
    this.api.post(this.treeUrl + 'getIntroCommitonByUserDates', { uid: this.user.uid, from: datef, to: datet }, data => {
      this.introArray = data;
      console.log(data);
      this.introTotCal();
    });
  }

  getIncomeByPin() {
    console.log(this.selectedPin);
    const pipe = new DatePipe('en-US');
    const datef = pipe.transform(this.from, 'yyyy-MM-dd');
    const datet = pipe.transform(this.to, 'yyyy-MM-dd');
    if (this.selectedPin > 0) {
      this.api.post(this.treeUrl + 'getPointCommitionById', { uid: this.user.uid, from: datef, to: datet, tid: this.selectedPin }, data => {
        this.pinIncome = data;
        console.log(this.pinIncome);
        this.pinCall();
      });
    } else {
      this.pinIncome = [];
      this.pointTot = 0;
    }

  }

  pinCall() {
    this.pointTot = 0;
    this.pinIncome.forEach(element => {
      this.pointTot += element.val;
    });
  }


}
