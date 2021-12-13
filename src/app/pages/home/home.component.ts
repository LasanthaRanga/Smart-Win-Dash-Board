import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { ActivatedRoute, Router } from '@angular/router';
// For MDB Angular Free
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { YoutubePipe } from 'app/youtube.pipe';

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
  images = true;
  value;
  video;
  constructor(private api: ApicallServiceService, private arout: ActivatedRoute, private config: NgbCarouselConfig) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      const id = params['id'];
      this.user = this.api.getLogUser()
      console.log(this.user);
      this.getValue();
      this.loadUser();
    });
  }

  getValue() {
    this.api.post(this.url + 'getValue', { key: 'homeimage' }, data => {
      this.value = data;
      console.log(this.value);
    });

    this.api.post(this.url + 'getValue', { key: 'homevideo' }, data => {
      this.video = data[0].value;
      console.log(this.video);
    });

  }



  loadUser() {
    this.api.post(this.url + 'searchUserById', { uid: this.user.uid }, data => {
      this.userData = data;
      console.log(this.userData);
    });
  }

}
