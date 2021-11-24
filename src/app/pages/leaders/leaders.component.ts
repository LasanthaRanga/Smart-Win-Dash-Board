import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {
  url = environment.apiUrl + 'user/'

  intoDuser;
  muid;
  name;

  mainList;
  smuid;
  kuid;
  kname;
  main;

  keyList;

  constructor(private api: ApicallServiceService) { }

  ngOnInit(): void {
    this.loadMainLeaders();
  }

  loadMain(event) {
    this.api.post(this.url + 'searchUserById', { uid: this.muid }, data => {
      console.log(data);
      if (data[0]) {
        this.intoDuser = data;

        this.intoDuser.forEach(el => {
          if (el.keyId === 2) {
            this.name = el.value;
          }
        });

        this.api.showNotification('success', 'Leader found');

      } else {
        this.api.showNotification('warning', 'Please Check Introducer ID');
      }
    });
  }

  loadKey(event) {
    this.api.post(this.url + 'searchUserById', { uid: this.kuid }, data => {
      console.log(data);
      if (data[0]) {
        this.intoDuser = data;

        this.intoDuser.forEach(el => {
          if (el.keyId === 2) {
            this.kname = el.value;
          }
        });

        this.api.showNotification('success', 'Leader found');
        this.loadMainLeaders();
      } else {
        this.api.showNotification('warning', 'Please Check Introducer ID');
      }
    });
  }

  loadMainLeaders() {
    this.api.post(this.url + 'getCoreLeaders', {}, data => {
      this.mainList = data;

    });
  }

  addCoreLeader() {
    this.api.post(this.url + 'addCoreLeader', { muid: this.muid, name: this.name }, data => {
      console.log(data);
      this.api.showNotification('success', 'Leader Added');
      this.loadMainLeaders();
    });
  }

  setMain(main) {
    console.log(main);
    this.main = main;
  }

  addKeyLeader() {
    this.api.post(this.url + 'addKeyLeader', { mid: this.smuid, kuid: this.kuid, kname: this.kname }, data => {
      console.log(data);
      this.api.showNotification('success', 'Leader Added');
      this.getKeyLeaders();
    });
  }

  getKeyLeaders() {
    this.api.post(this.url + 'getKeyLeaders', { mid: this.smuid }, data => {
      this.keyList = data;
      console.log(this.keyList);
    });
  }

}
