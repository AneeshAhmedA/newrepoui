import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../../Models/restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getallrestaurant',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './getallrestaurant.component.html',
  styleUrl: './getallrestaurant.component.css'
})
export class GetallrestaurantComponent {
  restaurants:Restaurant[] = [];
  constructor(private http:HttpClient,private router:Router){
    this.getAllRestaurants();
  }
  getAllRestaurants(){
    this.http
    .get<Restaurant[]>('http://localhost:5145/api/Restaurant')
    .subscribe((response)=>{
      this.restaurants = response;
      console.log(this.restaurants);
    }
    );
  }
  activateRestaurant(restaurantId: number) {
    // Implement activate logic (e.g., update the restaurant status in the backend)
    console.log(`Activate restaurant with ID: ${restaurantId}`);
  }

  deactivateRestaurant(restaurantId: number) {
    // Implement deactivate logic (e.g., delete the restaurant in the backend)
    console.log(`Deactivate restaurant with ID: ${restaurantId}`);

    // Make an HTTP request to update the backend
    this.http
      .delete(`http://localhost:5145/api/Restaurant/${restaurantId}`)
      .subscribe(
        () => {
          // Update the UI to reflect the changes (remove the restaurant from the list)
          this.restaurants = this.restaurants.filter((r) => r.restaurantId !== restaurantId);
          console.log(`Restaurant with ID ${restaurantId} deactivated successfully.`);
        },
        (error) => {
          console.error('Error deactivating restaurant:', error);
        }
      );
  }
}
