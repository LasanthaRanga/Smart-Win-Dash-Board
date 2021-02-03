import { Component, OnInit } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { from } from 'rxjs';
import { environment } from 'environments/environment'
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  url = environment.apiUrl + 'user/'
  uname; pword;
  TOKEN_KEY = 'secret';
  user;

  constructor(
    private api: ApicallServiceService,
    private helper: JwtHelperService,
    private router: Router) {

  }

  ngOnInit(): void {
  }

  login() {
    this.api.post(this.url + 'userLogin', { email: this.uname, pword: this.pword }, data => {
      try {
        console.log(data);
        if (data.status === 401) {
          this.api.showNotification('warning', 'User name or password is wrong');
        } else if (data.status === 500) {
          this.api.showNotification('warning', 'User name or password is wrong');
        } else if (data.mg === 'Auth Successfull') {
          this.user = this.helper.decodeToken(data['token']);
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem(this.TOKEN_KEY, data['token']);
          this.api.showNotification('success', 'Thank You For Login');
          window.location.href = '/';
        }
      } catch (error) {
        this.api.showNotification('warning', 'Login Error');
        console.log(error);
      }
    });
  }



}
