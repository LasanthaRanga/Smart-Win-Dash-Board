import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.css']
})
export class FormOneComponent implements OnInit {

  url = environment.apiUrl + 'user/'
  id; price; type;
  iSWno;
  iNidNo;
  iName;
  intoDuser;
  name;
  nic;
  address;
  mobile;
  SR;
  refId;
  user;
  submited =false;

  constructor(private arout: ActivatedRoute, private api: ApicallServiceService, private router: Router) {
    this.user = api.getLogUser();
    console.log(this.user);
  }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {
      this.id = params['id'];
      this.price = params['price'];
      this.type = params['type'];
      console.log(this.id, this.price, this.type);
    });
  }

  loadIntroducer(event: any) {
    // searchUserById
    this.api.post(this.url + 'searchUserById', { uid: this.iSWno }, data => {
      // console.log(data);
      if (data[0]) {
        this.intoDuser = data;
        this.intoDuser.forEach(el => {
          if (el.keyId === 2) {
            this.iName = el.value;
          }
          if (el.keyId === 21) {
            this.iNidNo = el.value;
          }
        });
        this.api.showNotification('success', 'Introducer found');
      } else {
        this.api.showNotification('warning', 'Please Check Introducer ID');
      }
    });
  }

  submit() {
    console.log(
      this.id,
      this.price,
      this.type,
      this.iSWno,
      this.iNidNo,
      this.iName,
      this.intoDuser,
      this.name,
      this.nic,
      this.address,
      this.mobile,
    )

    if (this.id && this.price && this.type && this.intoDuser && this.name && this.nic && this.address, this.mobile) {

      this.api.post(this.url + 'findByNic', { nic: this.nic }, data => {
        if (data.length > 0) {
          console.log(data.length);
          this.api.showNotification('warning', 'You are already registered please contact us');
        } else {
          console.log(this.mobile.length);
          if (this.mobile.length == 10) {

            this.submited = true;


            console.log("OK")
            let obj = {
              iSWno: this.iSWno,
              name: this.name,
              nic: this.nic,
              mobile: this.mobile,
              address: this.address,
              type: this.type,
              product: this.id,
              price: this.price,
              userId: this.user.uid
            }

            console.log(obj);

            this.api.post(this.url + 'formOne', obj, data => {
              console.log(data);
              if (data.SR) {
                this.SR = data.SR;
                this.refId = data.id;
              }
              this.api.showNotification('success', 'Request Completed');
            });


          } else {
            this.api.showNotification('warning', 'please enter valid mobile number');
          }
        }
      });

    }
  }


  go() {
    this.router.navigate(["/formTwo/" + this.refId + "/ref"]);
  }

}
