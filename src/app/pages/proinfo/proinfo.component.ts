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


  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

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

  save() {

    /////////// create order number /////////

   this.api.post(this.urlonpay + 'getorder', { }, data => {
    var od_id=data[0].order_id;
    this.order_id='smt2021831-'+od_id;
    console.log(this.order_id);


    ///// sace pay details /////

    this.api.post(this.urlonpay + 'savepaydetails', {
      cusid: '1',
      proid: this.proid,
      uprice: this.amount,
      rate: 0.03,
      tot: this.amount * 0.03,
      bill_tot: this.amount * 0.03 + this.amount,
      bank_order_id: this.order_id

    }, data => {

      this.final_bal=("0000000000" + (this.amount * 0.03 + this.amount)).slice(-10)+"00"; 
      let list = {
        Version: '1.0.0',
        MerID: '1000000000390',
        AcqID: '512940',
        MerRespURL: 'http://localhost/peoplsbank/index.php',
        PurchaseCurrency: '144',
        PurchaseCurrencyExponent: '2',
        OrderID: this.order_id,
        SignatureMethod: 's1r2W5B.',
        PurchaseAmt: this.final_bal,
        Signature: "s1r2W5B.1000000000390512940"+this.order_id+this.final_bal+"144",
        Nprice:  (this.amount * 0.03 + this.amount).toFixed(2)
      }
      window.location.href = 'http://localhost/peoplsbank/index.php?data=' + list.Signature + "&OrderID=" + list.OrderID + "&amount=" + list.PurchaseAmt + "&Nprice=" + list.Nprice;

    });


  });

  }


  create_order(){
   
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
      uprice: this.amount,
      rate: 0.03,
      tot: this.amount * 0.03,
      bill_tot: this.amount * 0.03 + this.amount,
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
