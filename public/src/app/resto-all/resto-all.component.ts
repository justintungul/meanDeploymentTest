import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resto-all',
  templateUrl: './resto-all.component.html',
  styleUrls: ['./resto-all.component.css']
})

export class RestoAllComponent implements OnInit {
  restos: Array<object>;
  restoId: string;
  isFormVisible: boolean;

  constructor(private _httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
    this.isFormVisible = false;
    this.getAllRestos();
  }

  getAllRestos() {
    let obs = this._httpService.getAllRestaurants();
    obs.subscribe(res => {
      console.log("Restaurants", res);
      this.restos = res['data'];
      for (var i = 0; i < this.restos.length; i++) {
        let current = this.restos[i];
        let currentTime = new Date(current['createdAt']);
        let now = new Date(Date.now());
        console.log( (now.getTime() - currentTime.getTime()) / 1000  ); 
        if ((now.getTime() - currentTime.getTime()) / 1000 < 30) {
          console.log('true');
          this.restos[i];
          this.restos[i].delete = true;
          console.log(this.restos[i]);
        }
      }
      console.log(this.restos);
    })
  }

  toggleForm(id: string) {
    this.isFormVisible = !this.isFormVisible;
    this.restoId = id;
  }
  
  dataFromChild(eventData) {
    this.isFormVisible = eventData;
    this.getAllRestos();
  }

  nukeResto(id: string){
    let obs = this._httpService.nukeRestaurantById(id);
    obs.subscribe(res => {
      console.log(res);
      this.getAllRestos();
    })
  }
}
