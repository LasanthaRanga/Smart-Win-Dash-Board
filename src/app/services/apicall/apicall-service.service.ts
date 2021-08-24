import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class ApicallServiceService {
  TOKEN_KEY = 'secret';

  constructor(private http: HttpClient) {

  }

  post(url, param, func) {
    this.http.post(url, param).subscribe(result => {
      func(result);
    }, error => {
      func(error);
    });
  }

  get(url, func) {
    this.http.get(url).subscribe(result => {
      func(result);
    }, error => {
      func(error);
    });
  }

  getLogUser() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {     
      return user;   
    } else {
      return null;
    }
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem(this.TOKEN_KEY);
    window.location.pathname = '/';
  }


  showNotification(color, mg) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    const from = 'top';
    const align = 'right';
    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: 'notifications',
      message: mg

    }, {
      type: color,
      timer: 2000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }


}
