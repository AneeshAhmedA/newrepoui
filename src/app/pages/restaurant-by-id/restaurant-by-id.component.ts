import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Restaurant } from '../../Models/restaurant';
import { ActivatedRoute,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-restaurant-by-id',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './restaurant-by-id.component.html',
  styleUrl: './restaurant-by-id.component.css'
})
export class RestaurantByIdComponent {
  restaurantId?: number = 0;
  restaurant:Restaurant;
  errMsg: String = '';
  isRestaurantExist:boolean = false;

  constructor(
    private http:HttpClient,
    private router:Router,
    private activateRoute: ActivatedRoute
  ){
    this.restaurant= new Restaurant();
    this.activateRoute.params.subscribe((r)=>(this.restaurantId = r['rid']));
    console.log(this.restaurantId);
    this.search();
  }

  search() {
    this.http
      .get<Restaurant>('http://localhost:5145/api/Restaurant/' + this.restaurantId)
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.restaurant = response;
          this.isRestaurantExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid Restaurant Id';
          this.isRestaurantExist = false;
        }
      });
  }
      delete() {
        this.restaurantId = this.restaurant.restaurantId;
        this.http
          .delete('http://localhost:5145/api/Restaurant/' + this.restaurantId)
          .subscribe((response) => {
            console.log(response);
            this.router.navigateByUrl('getallrestaurants');
          });
      }
}
