import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sysref',
  templateUrl: './sysref.component.html',
  styleUrls: ['./sysref.component.css']
})
export class SysrefComponent implements OnInit {

  user;
  url = environment.apiUrl + 'user/'
  refList;

  ptype = 0;

  constructor(private api: ApicallServiceService, private router: Router) {
    this.user = api.getLogUser();

  }

  ngOnInit(): void {
    this.getMyref(0);
  }
  statusChange() {
    this.getMyref(this.ptype)
  }
  getMyref(status) {
    this.api.post(this.url + "getMyref", { uid: this.user.uid, status: status, type: 'b' }, data => {
      this.refList = data;
      console.log(this.refList);
    })
  }

  goToFormTwo(id) {
    localStorage.removeItem('refid');
    this.router.navigate(['/formTwo/' + id + "/ref"]);
  }

}
