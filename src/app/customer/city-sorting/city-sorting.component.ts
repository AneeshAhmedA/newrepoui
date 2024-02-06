import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-sorting',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './city-sorting.component.html',
  styleUrl: './city-sorting.component.css'
})
export class CitySortingComponent {
  cities: any[] = [];
  filteredCities: string[] = [];
  citySearchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.getCities();
  }

  getCities() {
    this.http.get<any[]>('http://localhost:5145/api/City/GetAllCities').subscribe(
      (response) => {
        this.cities = response.map(city => city.cityName);
        this.filteredCities = this.cities;
      },
      (error) => {
        console.error('Error fetching cities from API', error);
      }
    );
  }

  filterCities() {
    this.filteredCities = this.cities.filter(city =>
      city.toLowerCase().includes(this.citySearchTerm.toLowerCase())
    );
  }

  navigateToRestaurantList(city: string) {
    // Assuming you have a route named 'restaurant-list' that takes the city as a parameter
    this.router.navigate(['user-dashboard/restaurant-list', { city: city }]);
  }
  clearSearch() {
    this.citySearchTerm = '';
    this.filterCities();
}
}