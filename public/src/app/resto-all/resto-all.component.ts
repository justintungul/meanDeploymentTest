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
