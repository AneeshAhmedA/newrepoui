import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Menuitem } from '../../Models/menuitem';
import { Router } from '@angular/router';


@Component({
  selector: 'app-GetResByCity',
  standalone: true,
  templateUrl: './get-res-by-city.component.html',
  styleUrls: ['./get-res-by-city.component.css'],
  imports: [FormsModule, CommonModule,HttpClientModule],
})
export class GetResByCityComponent {
  cities: any[] = [];
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  selectedCity: string = '';
  selectedRestaurant:any;
  menuItems: Menuitem[] = []; 
  filteredMenuItems: Menuitem[] = [];
  selectedMenuItem: Menuitem | null = null; 
  quantityOptions: number[] = [1, 2, 3, 4, 5,6,7,8,9,10];
  orderPlacementSuccess: boolean = false;
  httpResponse: any;

  constructor(private http: HttpClient,private router:Router) {
    this.getCities();
    this.getRestaurants();
  }

  getCities() {
    this.http.get<any[]>('http://localhost:5145/api/City/GetAllCities').subscribe(
      (response) => {
        this.cities = response.map(city => city.cityName);
      },
      (error) => {
        console.error('Error fetching cities from API', error);
      }
    );
  }

  getRestaurants() {
    const restaurantApiUrl = 'http://localhost:5145/api/Restaurant';

    this.http.get<any[]>(restaurantApiUrl).subscribe(
      (response) => {
        this.restaurants = response.map((restaurant) => ({ id: restaurant.restaurantId, name: restaurant.restaurantName }));
        console.log('Fetched Restaurants:', this.restaurants);
      },
      (error) => {
        console.error('Error fetching restaurants from API', error);
      }
    );
  }

  filterRestaurantsByCity(selectedCity: string) {
    console.log('Selected City:', selectedCity);
    console.log('All Restaurants:', this.restaurants);

    this.http.get<any[]>(`http://localhost:5145/api/Restaurant/GetRestaurantsByCity?cityName=${encodeURIComponent(selectedCity)}`).subscribe(
      (response) => {
        this.filteredRestaurants = response.map((restaurant) => ({ id: restaurant.restaurantId, name: restaurant.name }));
        console.log('Filtered Restaurants:', this.filteredRestaurants);

        this.selectedRestaurant = null;
        this.menuItems = [];
        this.filteredMenuItems = [];
        this.selectedMenuItem = null;

      },
      (error) => {
        console.error('Error fetching restaurants by city from API', error);
      }
    );
  }

  onSelectMenuItem(selectedMenuItem: Menuitem | any,) {
    console.log('Selected Menu Item:', selectedMenuItem);

    if (selectedMenuItem === null) {
      console.log('No Menu Item Selected');
    } else {
     
      this.selectedMenuItem = selectedMenuItem;
    }
  }

  fetchMenuItems() {
      console.log(this.selectedRestaurant.name)
      this.http.get<Menuitem[]>(`http://localhost:5145/api/MenuItem/ByRestaurant/${encodeURIComponent(this.selectedRestaurant.name)}`).subscribe(
        (response) => {
          this.menuItems = response.map((menuItem) => ({
            name: menuItem.name,
            description: menuItem.description,
            price: menuItem.price,
            menuItemId:menuItem.menuItemId,
            quantity:menuItem.quantity,
            image:menuItem.image
          }));
          console.log('Fetched Menu Items:', this.menuItems);
          this.filteredMenuItems = this.menuItems;
        },
        (error) => {
          console.error('Error fetching menu items by restaurant from API', error);
        }
      );
    }

  filterMenuItemsByName(selectedMenuItemName: string) {
    console.log('Selected Menu Item:', selectedMenuItemName);

    this.filteredMenuItems = this.menuItems.filter((menuItem) =>
      menuItem.name?.toLowerCase().includes(selectedMenuItemName.toLowerCase())
    );

    this.selectedMenuItem = null;
  }

  onSelectMenuItemDetail(menuItem: Menuitem) {
    console.log('Selected Menu Item:', menuItem);

    this.selectedMenuItem = menuItem;
  }
  AddToOrder(selectedOrderItem: Menuitem) {
    const userId = localStorage.getItem('userId');
    const orderApiUrl = 'http://localhost:5145/api/Order';
  
    const orderData = {
      userId: userId,
      restaurantId: this.selectedRestaurant?.id,
      menuItemId: selectedOrderItem.menuItemId,
      orderDate: new Date(),
      quantity: selectedOrderItem.quantity,
      totalPrice: selectedOrderItem.quantity * selectedOrderItem.price,
    };
  
    // Log order information to the console
    console.log('Order Information:', {
      name: selectedOrderItem.name,
      description: selectedOrderItem.description,
      price: selectedOrderItem.price,
      menuItemId: selectedOrderItem.menuItemId,
      quantity: selectedOrderItem.quantity,
      totalPrice: selectedOrderItem.quantity * selectedOrderItem.price,
      
    });
  
    this.http.post(orderApiUrl, orderData).subscribe(
      (response: any) => {
        console.log('Order placed successfully:', response);
        this.orderPlacementSuccess = true;
        setTimeout(() => {
          this.orderPlacementSuccess = false;
          this.router.navigate(['user-dashboard', 'order-list']);
        }, 50);
      },
      (error) => {
        console.error('Error placing order', error);
      }
    );
  } 
}
