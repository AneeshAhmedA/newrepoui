import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Restaurant } from '../../../Models/restaurant';
import { RestuploadComponent } from '../../../restupload/restupload.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,RestuploadComponent],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})

export class AddRestaurantComponent {
  restaurant: Restaurant;

  constructor(private http: HttpClient, private router: Router) {
    this.restaurant = new Restaurant();
  }

  addRestaurant() {
    this.restaurant.image = localStorage.getItem('Restaurant-img');

    this.http
      .post('http://localhost:5145/api/Restaurant', this.restaurant)
      .subscribe((response) => {
        console.log(response);
      });
      this.router.navigateByUrl('admin-dashboard/getallrestaurants');

  }
}
