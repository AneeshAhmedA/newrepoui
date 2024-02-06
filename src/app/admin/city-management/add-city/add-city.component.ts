import { Component } from '@angular/core';
import { City } from '../../../Models/city';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})
export class AddCityComponent {
  city:City;
  constructor(private http:HttpClient,private router:Router){
    this.city = new City();
  }
  addCity() {
    this.http.post('http://localhost:5145/api/City/CreateCity', this.city, { responseType: 'text' })
      .subscribe(
        (response) => {
          console.log(response);
          if (response === 'City created successfully.') {
            this.router.navigate(['admin-dashboard/city-details']);
          } else {
            console.error('Unexpected response:', response);
          }
        },
        (error) => {
          console.error('Error adding city:', error);
        }
      );
  }
}
