import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.css']
})
export class FormTwoComponent implements OnInit {

  urlUser = environment.apiUrl + 'user/';
  tree = environment.apiUrl + 'tree/';
  urlUpload = environment.apiUrl + 'up/';
  id;
  refData;
  storId;
  user;
  treeData;

  plasemantId;
  aPlacementNo;
  placement;
  message;
  aPin;
  side;
  can;

  keyList;

  isClickedcheck;

  bankList;

  branchList;

  mainList;
  smuid;
  keyLeaders;
  skey;

  complete = true;

  selectedFile;
  fileType;
  urlbtn;
  isLoading;
  upProgrus;
  isafterupload;
  url;
  SRNumber;
  isOffice = false;

  selectedRef;

  constructor(private arout: ActivatedRoute, private api: ApicallServiceService, private http: HttpClient, private route: Router) {
    this.user = api.getLogUser();
  }

  ngOnInit(): void {
    this.arout.params.subscribe(params => {

      const type = params['type'];

      if (type === "ref") {
        console.log(type);
        this.id = params['id'];
        console.log(params['id']);
        localStorage.setItem('refid', JSON.stringify({ id: params['id'] }));
        console.log(this.storId);
      }

      this.storId = JSON.parse(localStorage.getItem('refid'));

      if (type === "tree") {
        console.log("tree");
        console.log(params['id']);
        this.plasemantId = params['id'];
        this.aPlacementNo = this.plasemantId;
        this.loadPlaceMent();
      }



      if (this.storId) {
        this.getOneRef()
      }

    });




  }



  goToTree() {
    this.api.post(this.tree + 'getCurrent', { uid: this.user.uid }, data => {
      this.treeData = data;
      console.log(this.treeData[0].swTreeId);
      // window.location.href = 'https://sw.smartwinent.com/chart?data=' + this.treeData[0].swTreeId;
      window.location.href = 'http://localhost/chart?data=' + this.treeData[0].swTreeId;
    });
  }

  getOneRef() {
    this.api.post(this.urlUser + 'getOneRef', { id: this.storId.id }, data => {
      this.refData = data[0];
      console.log(this.refData);
    });
  }

  loadPlaceMent() {
    // commitionId
    this.api.post(this.tree + 'canAdd', { treeId: this.plasemantId }, data => {
      if (data.treeId > 0) {
        if (data.sidA || data.sidB) {
          this.api.showNotification('success', 'Placement found');
          this.placement = data;
          this.message = 'Placement found'
          this.getUserKeyList();
          this.loadMainLeaders();
          this.aPlacementNo = data.userId;
          this.aPin = data.treeId;

          if (data.sidA) {
            this.side = 'A';
            this.can = true;
          } else if (data.sidB) {
            this.side = 'B';
            this.can = true;
          } else {
            this.side = null;
            this.can = false;
            this.message = 'Cannot Add Pins Are Full'
            window.location.href = 'http://localhost/chart?data=' + this.treeData[0].swTreeId;
          }

        } else {
          this.api.showNotification('warning', 'Both Sides Are Full');
          this.can = false;
          this.message = 'Cannot Add Pins Are Full'
          window.location.href = 'http://localhost/chart?data=' + this.treeData[0].swTreeId;
        }
      } else {
        this.api.showNotification('danger', 'Please Check Pin ID');
        this.message = 'Cannot Add Pins Are Full'
        this.can = false;
        window.location.href = 'http://localhost/chart?data=' + this.treeData[0].swTreeId;
      }
      console.log(data);
    });
  }

  loadMainLeaders() {
    this.api.post(this.urlUser + 'getCoreLeaders', {}, data => {
      this.mainList = data;
    });
  }

  getKeyLeaders() {
    this.api.post(this.urlUser + 'getKeyLeaders', { mid: this.smuid.id }, data => {
      this.keyLeaders = data;
    });
  }

  getUserKeyList() {
    this.api.post(this.urlUser + 'getUserKeys', {}, data => {
      this.keyList = data;
      console.log(this.keyList);
      this.fillKey();
      this.getBanks();
    });
  }

  getBanks() {
    this.api.post(this.urlUser + 'getAllBank', {}, data => {
      this.bankList = data;
      console.log(this.bankList);
    });
  }

  bankChange(bank) {
    console.log(bank);
    this.api.post(this.urlUser + 'getBranch', { bcode: bank.code }, data => {
      this.branchList = data;
      console.log(this.branchList);
      this.keyList.forEach(element => {
        if (element.idUserKey == 23) {
          element.val = bank.code;
        }
      });
    });
  }

  branchChange(branch) {
    console.log(branch);
    this.keyList.forEach(element => {
      if (element.idUserKey == 24) {
        element.val = branch.br_code;
      }
    });
  }

  fillKey() {
    this.keyList.forEach(element => {
      if (element.idUserKey == 2) {
        element.val = this.refData.namewith;
      }

      if (element.idUserKey == 5) {
        element.val = this.refData.address;
      }

      if (element.idUserKey == 9) {
        element.val = this.refData.mobile;
      }

      if (element.idUserKey == 21) {
        element.val = this.refData.nic;
      }

      if (element.idUserKey == 12) {
        element.val = "Sri Lankan";
      }

    });
  }

  cheeck(event) {

  }

  save() {
    let isValid = false;
    if (this.refData && this.plasemantId && this.side) {
      isValid = true;
      this.keyList.forEach(element => {
        if (element.idUserKey == 16) {
          element.val = element.val.name;
        }
        if (element.idUserKey == 17) {
          element.val = element.val.br_name;
        }
        if (!element.val) {
          this.api.showNotification('warning', element.key + ' is Empty');
          isValid = false;
        }
      });
    }

    if (isValid) {
      this.complete = false;
      const obj = {
        ref: this.refData.id,
        vlaues: this.keyList,
        // purchaser: prop,
        introUid: this.refData.iSWno,
        aPin: this.aPin,
        aPinUid: this.aPlacementNo,
        side: this.side,
        type: "owner",
        product: this.refData.product,
        firstPay: this.refData.price,
        status: 0,
        otherint1: this.smuid.main,
        otherint2: this.skey.key,
        otherstring1: '',
        otherstring2: ''
      }

      console.log(this.refData);

      this.api.post(this.urlUser + 'updateRefData', obj, res => {
        console.log(res);
        this.api.showNotification('success', 'User Data saved');


        if (this.refData.payType == "d") {
          console.log("DIRECT");
          this.isOffice = true;
          this.runProcess(this.refData.id);
        }

      });


    }
  }



  runProcess(ref) {
    this.api.post(this.urlUser + "getBankRefarance", { ref: ref }, data => {
      this.selectedRef = data[0];

      this.api.post(this.urlUser + "getTempData", { ref: ref }, temp => {
        const kl = temp;
        const obj = {
          ref: this.selectedRef.id,
          vlaues: kl,
          // purchaser: prop,
          introUid: this.selectedRef.iSWno,
          aPin: this.selectedRef.aPin,
          aPinUid: this.selectedRef.aPinUid,
          side: this.selectedRef.side,
          type: "owner",
          product: this.selectedRef.product,
          firstPay: this.selectedRef.price,
          status: 0,
          otherint1: this.selectedRef.otherint1,
          otherint2: this.selectedRef.otherint2,
          otherstring1: '',
          otherstring2: '',


        }
        console.log(obj);
        this.api.post(this.tree + 'newNode', obj, res => {
          this.api.showNotification('success', 'All Done');
          this.api.post(this.url + "completeBankPros", { ref: ref }, data => {
            localStorage.removeItem("refid");
          });


          console.log(res.idMain);
          this.route.navigate(['/complete/' + res.idMain])

        });
      });
    })
  }



  onFileSelected(event) {
    this.urlbtn = true;
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (imgsrc: any) => { // called once readAsDataURL is completed
      this.fileType = this.selectedFile.type;
      if (this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png') {
        this.url = imgsrc.target.result;
      } else {
        this.url = '../assets/img/noimage.jpg';
      }
    };

    // console.log(event);
  }

  onUpload() {
    if (this.SRNumber) {

      this.isLoading = true;
      const fd = new FormData();

      fd.append('ref', this.refData.id);
      fd.append('sr', this.SRNumber);

      if (this.selectedFile != null) {
        fd.append('attach', this.selectedFile, this.selectedFile.name);
      }

      this.http.post(this.urlUpload + 'uploadres', fd, {
        reportProgress: true,
        observe: 'events'
      }).subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.upProgrus = Math.round(events.loaded / events.total * 100);
          if (this.upProgrus === 100) {

            this.api.showNotification('success', 'Image Uploaded please wait to complete');
            this.urlbtn = false;
            //this.router.navigate(['home']);
            this.isLoading = false;
            this.isafterupload = true;
            localStorage.removeItem('refid');
            this.route.navigate(['sysref'])

          }
        } else if (events.type === HttpEventType.Response) {
          console.log(events);
        }
      });

    } else {
      this.api.showNotification('warning', 'Please Enter SR Number');
    }
  }





}
