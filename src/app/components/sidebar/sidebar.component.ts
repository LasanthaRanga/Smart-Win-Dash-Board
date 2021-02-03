import { Component, OnInit } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  // { path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  // { path: '/typography', title: 'Typography', icon: 'library_books', class: '' },
  // { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  // { path: '/register', title: 'Registration', icon: 'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  url = environment.apiUrl + 'user/'

  menuItems: any[];

  constructor(private api: ApicallServiceService) { }

  ngOnInit() {
    this.getPrivilages();


  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  getPrivilages() {
    const user = this.api.getLogUser();

    if (user) {
      const ar = [];
      this.api.post(this.url + 'getPrivilagesByUserType', { idUtype: user.uType }, data => {
        data.forEach(element => {
          const obj = { path: element.link, title: element.name, icon: element.icon, class: '' };
          ar.push(obj);
          ROUTES = ar;
          this.menuItems = ROUTES.filter(menuItem => menuItem);
        });
      })
    }
  }

  signOut() {
    this.api.logOut();
  }

}
