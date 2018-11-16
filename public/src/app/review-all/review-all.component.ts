import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IBrowser } from 'selenium-webdriver';

@Component({
  selector: 'app-review-all',
  templateUrl: './review-all.component.html',
  styleUrls: ['./review-all.component.css']
})
export class ReviewAllComponent implements OnInit {
  id: string;
  resto: object;
  reviews: Array<object>;
  isFormVisible: boolean;

  constructor(
    private route: ActivatedRoute, 
    private _httpService: HttpService, 
    private router: Router) {}

  ngOnInit() {
    this.resto = {};
    this.isFormVisible = false;
    this.getRestoById();
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  
  getRestoById(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
      let observable = this._httpService.getRestaurantById(params['id']);
      observable.subscribe(res => {
        console.log(res);
        this.resto = res['data'][0];
        this.reviews = this.resto['reviews'];
        console.log(this.reviews);
        this.reviews.sort(this.compare);
        console.log(this.reviews);
      })
   });
  }
  
  dataFromChild(eventData) {
    console.log(eventData);
    this.isFormVisible = eventData;
    this.getRestoById();
  }

  compare(a, b) {
    const genreA = a.rating;
    const genreB = b.rating;
  
    let comparison = 0;
    if (genreA < genreB) {
      comparison = 1;
    } else if (genreA > genreB) {
      comparison = -1;
    }
    return comparison;
  }
  

}
