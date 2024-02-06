// menu-management.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-management',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css'],
})
export class MenuManagementComponent {
  menuItems: any[] = [];
  newMenuItem: any = {};
  restaurantName: string = '';
  showAddForm: boolean = false;

  constructor(private http: HttpClient) {}

  getAllMenuItems(): void {
    this.http.get<any[]>('http://localhost:5145/api/MenuItem').subscribe((data) => {
      this.menuItems = data;
    });
  }

  getMenuItemsByRestaurant(): void {
    this.http
      .get<any[]>(`http://localhost:5145/api/MenuItem/ByRestaurant/${this.restaurantName}`)
      .subscribe((data) => {
        this.menuItems = data;
      });
  }

  addMenuItem(): void {
    // Ensure newMenuItem is not empty
    if (!this.newMenuItem) {
      console.error('Error adding menu item: newMenuItem is empty.');
      return;
    }
  
    // Ensure restaurantName is provided
    if (!this.newMenuItem.restaurantName) {
      console.error('Error adding menu item: restaurantName is required.');
      return;
    }
  
    // Send the correct payload to the server
    this.http.post('http://localhost:5145/api/MenuItem', this.newMenuItem).subscribe(
      () => {
        this.getMenuItemsByRestaurant();
        this.newMenuItem = {}; // Clear the form
        console.log('Menu item added successfully.');
      },
      (error) => {
        console.error('Error adding menu item:', error);
      }
    );
  }
}