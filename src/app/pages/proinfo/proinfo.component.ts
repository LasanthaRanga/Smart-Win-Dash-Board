import { Component, OnInit, ViewChild } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-proinfo',
  templateUrl: './proinfo.component.html',
  styleUrls: ['./proinfo.component.css']
})
export class ProinfoComponent implements OnInit {
  urlProd = environment.apiUrl + 'prod/'
  urlonpay = environment.apiUrl + 'onpay/'
  treeUrl = environment.apiUrl + 'tree/'
  proid;

  proname;
  description;
  amount;
  url;
  moreimages;
  user;
  order_id;

  images = []

  final_bal;
  ptype;
  partpays;

  payamount;


  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  isClickedcheck = false;
  obj = [];

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }




  constructor(private api: ApicallServiceService, private arout: ActivatedRoute, private http: HttpClient) {
    this.user = api.getLogUser();
    // console.log(this.user);
    this.ptype = "onpay";

  }

  ngOnInit(): void {

    this.arout.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.proid = id;
        this.moreinfoby_id(id);
        this.getmoreimages(id);

        // let obj = {
        //   vlaues: 'this.keyList',
        //   purchaser: 'prop',
        //   introUid: 'this.iSWno',
        //   aPin: 'this.aPin',
        //   aPinUid: 'this.aPlacementNo',
        //   side: 'this.side',
        //   type: 'this.type',
        //   product: 'this.product',
        //   firstPay: 'this.firstPay'
        // }

        // console.log(obj['firstPay']);

        //const objs = JSON.parse(localStorage.getItem('objx'));
        this.obj = JSON.parse(localStorage.getItem('objx'));
        this.payamount = Number(this.obj['firstPay']);
        console.log(this.payamount);
        this.partpays = this.payamount;


      } else {

      }
    });
  }

  more(id) {

  }

  moreinfoby_id(id) {
    this.api.post(this.urlProd + 'getproductbyid', { prodid: id }, data => {
      this.proname = data[0].prodName;
      this.description = data[0].description;
      this.amount = data[0].prodPrice;
      this.url = data[0].prodImage;
    });
  }

  cha() {
    // console.log(this.ptype);
    // if(this.ptype == 'fullpay'){
    //   this.isClickedcheck =false;
    // }else if(this.ptype == 'partpay'){
    //   this.isClickedcheck =true;
    // }

  }

  save() {

    if (this.ptype == 'onpay') {
      // this.obj.push({'product':this.proid})
      // console.log( this.obj);

      /////////// create order number /////////

      this.obj['product'] = this.proid;
      localStorage.setItem('objx', JSON.stringify(this.obj));
      console.log("xxxxxxx");
      console.log(this.obj);
      console.log("xxxxxxxx");

      console.log("asdf asdf asdf");
      localStorage.setItem("pro_id", this.proid);
      this.api.post(this.urlonpay + 'getorder', {}, data => {
        var od_id = data[0].order_id;
        this.order_id = 'smt2021831-' + od_id;
        console.log(this.order_id);

        ///// sace pay details /////

        //this.payamount = this.amount;


        localStorage.setItem("p_amount", this.payamount);

        this.api.post(this.urlonpay + 'savepaydetails', {
          cusid: '1',
          proid: this.proid,
          uprice: this.payamount,
          rate: 0.03,
          tot: this.payamount * 0.03,
          bill_tot: this.payamount * 0.03 + this.payamount,
          bank_order_id: this.order_id,
          //obj:this.obj

        }, data => {

          this.final_bal = ("0000000000" + (this.payamount * 0.03 + this.payamount)).slice(-10) + "00";
          let list = {
            Version: '1.0.0',
            MerID: '1000000003127',
            //MerID: '1000000000390',
            AcqID: '512940',
            MerRespURL: 'https://sw.smartwinent.com/peoplsbank/index.php',
            //MerRespURL: 'http://localhost/bn/index.php',
            PurchaseCurrency: '144',
            PurchaseCurrencyExponent: '2',
            OrderID: this.order_id,
            SignatureMethod: 'FA8uj24,',
            //SignatureMethod: 's1r2W5B',
            PurchaseAmt: this.final_bal,
            Signature: "FA8uj24,1000000003127512940" + this.order_id + this.final_bal + "144",
            //Signature: "s1r2W5B.1000000000390" + this.order_id + this.final_bal + "144",
            Nprice: (this.payamount * 0.03 + this.payamount).toFixed(2),
            Bcharges: (this.payamount * 0.03).toFixed(2),
            pprice: this.payamount.toFixed(2),
            obj: JSON.stringify(this.obj)
          }

          window.location.href = 'https://sw.smartwinent.com/peoplsbank/index.php?data=' + list.Signature + "&OrderID=" + list.OrderID + "&amount=" + list.PurchaseAmt + "&Nprice=" + list.Nprice + "&Bcharges=" + list.Bcharges + "&pprice=" + list.pprice;
          //  window.location.href = 'http://localhost/peoplsbank/index.php?data=' + list.Signature + "&OrderID=" + list.OrderID + "&amount=" + list.PurchaseAmt + "&Nprice=" + list.Nprice + "&Bcharges=" + list.Bcharges + "&pprice=" + list.pprice + "&obj=" + list.obj;

        });

      });

    } else {
      console.log("bfef");
      this.save_bank();
    }
  }


  async save_bank() {
    this.obj['product'] = this.proid;
    localStorage.setItem('objx', JSON.stringify(this.obj));
    console.log("xxxxxxx");
    console.log(this.obj);
    console.log("xxxxxxxx");

    let obj = JSON.parse(localStorage.getItem('objx'));

    console.log(obj);

    // this.api.post(this.urlonpay + 'bank', obj.vlaues, res => {
    //   console.log(res);
    //   this.api.showNotification('success', 'All Done');
    // });

    let savedID;


    let headers = new HttpHeaders().set('content-typecontent-type', 'application/json').set('X-Master-Key', '$2b$10$TGHRHtoAyicR0JES3sAV.eHNrbcGO.34wWRbHuhvJoOK/yN63kkNC');

    this.http.post('https://api.jsonbin.io/v3/b ', obj, { 'headers': headers }).subscribe(data => { // json data save
      console.log(data);
      console.log(data['metadata'].id);
      savedID = data['metadata'].id;
    })


    this.http.get('https://api.jsonbin.io/v3/b' + savedID, { 'headers': headers }).subscribe(data => {// json data get
      console.log(data)
      console.log(data['metadata'].id);
    })




  }

  create_order() {

  }




  getmoreimages(id) {
    this.api.post(this.urlProd + 'moreimgbyproid', { prodid: id }, data => {
      this.moreimages = data;
      // console.log(this.moreimages);
      var arr = JSON.stringify(this.moreimages);
      // console.log(arr);
      var datas = [];
      for (let result of this.moreimages) {
        this.images.push(result['url1']);
        // console.log("dfgfgggg");
        // console.log(datas);
        // console.log("dfgfgggg");
      }
    });
  }

  pay() {
    this.api.post(this.urlonpay + 'savepaydetails', {
      cusid: '1',
      proid: this.proid,
      uprice: this.payamount,
      rate: 0.03,
      tot: this.payamount * 0.03,
      bill_tot: this.payamount * 0.03 + this.payamount,
      bank_order_id: 'smt2021831-203'

    }, data => {



    });


    // let list = {
    //   Version: '1.0.0',
    //   MerID: '1000000000390',
    //   AcqID: '512940',
    //   MerRespURL: 'http://localhost/peoplsbank/index.php',
    //   PurchaseCurrency: '144',
    //   PurchaseCurrencyExponent: '2',
    //   OrderID: 'smt2021831-203',
    //   SignatureMethod: 's1r2W5B.',
    //   PurchaseAmt: '000000000100',
    //   Signature: "s1r2W5B.1000000000390512940smt2021831-203000000000100144"
    // }
    // window.location.href = 'http://localhost/peoplsbank/index.php?data=' + list.Signature + "&OrderID=" + list.OrderID + "&amount=" + list.PurchaseAmt;
  }





}
