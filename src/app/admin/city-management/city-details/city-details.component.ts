import { Component } from '@angular/core';
import { City } from '../../../Models/city';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-city-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.css'
})
export class CityDetailsComponent {
  cities: City[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.cityDetails();
  }

  cityDetails() {
    this.http
      .get<City[]>('http://localhost:5145/api/City/GetAllCities')
      .subscribe(
        (response) => {
          this.cities = response;
          console.log(this.cities);
        },
        (error) => {
          console.error('Error fetching cities:', error);
        }
      );
  }


}
