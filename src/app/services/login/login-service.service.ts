import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApicallServiceService } from '../apicall/apicall-service.service';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  url = environment + 'user/userLogin';

  constructor(private api: ApicallServiceService) { }

  login(parm) {
    this.api.post(this.url, parm, res => {
      console.log(res);
    });
  }

}
