import { Component, OnInit,ViewChild } from '@angular/core';
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
  proid;

  proname;
  description;
  amount;
  url;
  moreimages;

   images=[]


  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

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




  constructor(private api: ApicallServiceService, private arout: ActivatedRoute) { }

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

  save() { }


  getmoreimages(id){
    this.api.post(this.urlProd + 'moreimgbyproid', { prodid: id }, data => {
      this.moreimages=data;
      console.log(this.moreimages);
      var arr=JSON.stringify( this.moreimages);
      console.log(arr);
      var datas = [];
     for(let result of this.moreimages){
      this.images.push(result['url1']);
      console.log("dfgfgggg");
      console.log(datas);
      console.log("dfgfgggg");
     }
    });
  }

  pay(){
        var feed = {created_at: "2017-03-14T01:00:32Z", entry_id: 33358, field1: "4", field2: "4", field3: "0"};

    var data = [];
    data.push(feed['field2']);

    console.log(data);
  }

}
