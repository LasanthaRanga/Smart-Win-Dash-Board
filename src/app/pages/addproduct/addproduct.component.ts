import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ApicallServiceService } from 'app/services/apicall/apicall-service.service';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  urlProd = environment.apiUrl + 'prod/'
  urlUpload = environment.apiUrl + 'up/'

  idCat;
  cdescription;
  cat_name;
  cats;
  selected_cat;

  prod_cat;
  prod_name;
  prod_description;
  prod_price;

  selectedFile;
  fileType;
  url;
  isLoading = false;
  upProgrus;

  prodId;




  constructor(private api: ApicallServiceService, private http: HttpClient) { }





  ngOnInit(): void {
    this.getCats();
  }

  getCats() {
    this.api.post(this.urlProd + 'getProdCat', {}, data => {
      this.cats = data;
      console.log(this.cats);
    })
  }

  newCat() {
    this.idCat = null;
    this.cdescription = null;
    this.cat_name = null;
    this.selected_cat = null;
  }

  selectCat() {
    console.log(this.selected_cat);
    this.cat_name = this.cats[this.selected_cat - 1].cat_name;
    this.idCat = this.selected_cat;
  }

  saveCat() {
    console.log(this.idCat);

    if (this.idCat) {
      this.api.post(this.urlProd + 'updateProdCat', { cat_name: this.cat_name, cdescription: null, idCat: this.idCat }, data => {
        this.api.showNotification('success', 'Category Updated');
        this.getCats();
      })
    } else {
      this.api.post(this.urlProd + 'addProdCat', { cat_name: this.cat_name, cdescription: null }, data => {
        this.api.showNotification('success', 'Category Added');
        this.getCats();
      })
    }


  }

  addProd() {
    let prod = {
      pcat: this.prod_cat,
      plink: null,
      pdescription: this.prod_description,
      pprice: this.prod_price,
      pname: this.prod_name
    }

    console.log(prod);

    this.api.post(this.urlProd + 'addProduct', prod, data => {
      if (data) {
        this.prodId = data.insertId;
        console.log(data);
        this.api.showNotification('success', 'Product Added');
      }

    })
  }


  onUpload() {
    this.isLoading = true;
    const fd = new FormData();

    fd.append('pid', this.prodId);

    if (this.selectedFile != null) {
      fd.append('attach', this.selectedFile, this.selectedFile.name);
    }

    this.http.post(this.urlUpload + 'upload', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.upProgrus = Math.round(events.loaded / events.total * 100);
        if (this.upProgrus === 100) {

          setTimeout(() => {
            this.isLoading = false;
            //   this.loadAttach();
            this.selectedFile = null;
            this.url = null;
            this.prodId = null;
            this.prod_cat = null;
            this.prod_name = null;
            this.prod_price = null;
            this.prod_description = null;
            this.api.showNotification('success', 'Image Uploaded');
          }, 2000)


        }
      } else if (events.type === HttpEventType.Response) {
        console.log(events);
      }
    });


  }


  onFileSelected(event) {
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

}
