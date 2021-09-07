import { Component, OnInit, ViewChild } from '@angular/core';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proinfo',
  templateUrl: './proinfo.component.html',
  styleUrls: ['./proinfo.component.css']
})
export class ProinfoComponent implements OnInit {
  urlProd = environment.apiUrl + 'prod/'
  urlonpay = environment.apiUrl + 'onpay/'
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




  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) {
    this.user = api.getLogUser();
    console.log(this.user);

  }

  ngOnInit(): void {

    this.arout.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.proid = id;
        this.moreinfoby_id(id);
        this.getmoreimages(id);
        this.ptype = 'fullpay';

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

    /////////// create order number /////////
    console.log("asdf asdf asdf");
    localStorage.setItem("pro_id", this.proid);
    this.api.post(this.urlonpay + 'getorder', {}, data => {
      var od_id = data[0].order_id;
      this.order_id = 'smt2021831-' + od_id;
      console.log(this.order_id);


      ///// sace pay details /////
      if (this.ptype == 'fullpay') {

        this.payamount = this.amount;

      } else if (this.ptype == 'partpay') {
        this.payamount = Number(this.partpays);
        //console.log(this.partpays);
      }

      if (this.payamount >= 7000) {

        localStorage.setItem("p_amount", this.payamount);

        this.api.post(this.urlonpay + 'savepaydetails', {
          cusid: '1',
          proid: this.proid,
          uprice: this.payamount,
          rate: 0.03,
          tot: this.payamount * 0.03,
          bill_tot: this.payamount * 0.03 + this.payamount,
          bank_order_id: this.order_id

        }, data => {

          this.final_bal = ("0000000000" + (this.payamount * 0.03 + this.payamount)).slice(-10) + "00";
          let list = {
            Version: '1.0.0',
            MerID: '1000000003127',
            AcqID: '512940',
            MerRespURL: 'https://sw.smartwinent.com/peoplsbank/index.php',
            PurchaseCurrency: '144',
            PurchaseCurrencyExponent: '2',
            OrderID: this.order_id,
            SignatureMethod: 'FA8uj24,',
            PurchaseAmt: this.final_bal,
            //Signature: "A8uj24,1000000003127512940" + this.order_id + this.final_bal + "144",
            Signature: "FA8uj24,1000000003127512940" + this.order_id + this.final_bal + "144",
            Nprice: (this.payamount * 0.03 + this.payamount).toFixed(2),
            Bcharges: (this.payamount * 0.03).toFixed(2),
            pprice: this.payamount.toFixed(2)
          }
          window.location.href = 'https://sw.smartwinent.com/peoplsbank/index.php?data=' + list.Signature + "&OrderID=" + list.OrderID + "&amount=" + list.PurchaseAmt + "&Nprice=" + list.Nprice + "&Bcharges=" + list.Bcharges + "&pprice=" + list.pprice;

        });

      } else {
        this.api.showNotification('warning', "Pay amount must be grater than LKR 7000.00");

      }

    });
  }






  create_order() {

  }



  getmoreimages(id) {
    this.api.post(this.urlProd + 'moreimgbyproid', { prodid: id }, data => {
      this.moreimages = data;
      console.log(this.moreimages);
      var arr = JSON.stringify(this.moreimages);
      console.log(arr);
      var datas = [];
      for (let result of this.moreimages) {
        this.images.push(result['url1']);
        console.log("dfgfgggg");
        console.log(datas);
        console.log("dfgfgggg");
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
