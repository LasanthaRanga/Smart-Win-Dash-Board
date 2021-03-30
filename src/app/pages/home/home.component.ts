import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  treeUrl = environment.apiUrl + 'tree/'
  user;
  userData;


  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) { }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      const id = params['id'];
      this.user = this.api.getLogUser()
      console.log(this.user);
      this.loadUser();

    });
  }

  loadUser() {
    this.api.post(this.url + 'searchUserById', { uid: this.user.uid }, data => {
      this.userData = data;
      console.log(this.userData);     
    });
  }

}
