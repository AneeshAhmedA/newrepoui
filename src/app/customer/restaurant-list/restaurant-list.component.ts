import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../Models/restaurant';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule,RouterLink],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {
  selectedCity: string | undefined;
  selectedRestaurantId: string | undefined;
  restaurants: Restaurant[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.selectedCity = params['city'];
      this.getFilteredRestaurants();
    });
  }

  getFilteredRestaurants() {
    if (this.selectedCity) {
      this.http.get<Restaurant[]>(`http://localhost:5145/api/Restaurant/GetRestaurantsByCity?cityName=${encodeURIComponent(this.selectedCity)}`).subscribe(
        (response) => {
          this.restaurants = response;
          console.log('Filtered Restaurants:', this.restaurants);
        },
        (error) => {
          console.error('Error fetching filtered restaurants from API', error);
        }
      );
    }
  }

  navigateToMenuItems(restaurantId:any) {
    console.log(restaurantId)
    // Assuming you have a route named 'menu-items' that takes the restaurantId as a parameter
    this.router.navigateByUrl('user-dashboard/menu-items/'+restaurantId );
  }

  getRestaurantImage(restaurant: Restaurant): string {

    return `http://localhost:5145/Resources/Images/${restaurant.image}`;
  }

  logout():void{
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
