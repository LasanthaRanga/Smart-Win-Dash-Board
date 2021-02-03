import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment'
@Component({
  selector: 'app-create-pass',
  templateUrl: './create-pass.component.html',
  styleUrls: ['./create-pass.component.css']
})
export class CreatePassComponent implements OnInit {
  url = environment.apiUrl + 'user/'
  uname;
  pword;
  vfcode;
  constructor(private api: ApicallServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  createMyPassword() {
    this.api.post(this.url + 'createPassword', { uid: this.uname, pword: this.pword, code: this.vfcode }, data => {
      console.log(data);
      if (data.mg === 'password created') {
        this.router.navigate(['/login']);
        this.api.showNotification('success', data.mg);
      } else {
        this.api.showNotification('warning', data.mg)
      }
    })
  }

}
