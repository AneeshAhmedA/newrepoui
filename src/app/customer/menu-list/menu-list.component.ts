import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Menuitem } from '../../Models/menuitem';
import { Res } from '../../Models/res';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  imports: [FormsModule, CommonModule,HttpClientModule],
})
export class MenuListComponent {
  rid?: number;
  rname?: string;
  selectedRestaurant: Res;
  menuItems: Menuitem[] = [];
  filteredMenuItems: Menuitem[] = [];
  quantityOptions: number[] = [1, 2, 3];
  orderItems: Menuitem[] = []; // Array to store the current order
  userId: string | null = null; // Initialize userId to null

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((p) => (this.rid = p['rid']));
    console.log(this.rid);
    this.selectedRestaurant = new Res();
    this.http
      .get<Res>('http://localhost:5145/api/Restaurant/' + this.rid)
      .subscribe((response) => {
        console.log(response);
        this.selectedRestaurant = response;
        this.rname = this.selectedRestaurant.name;
        console.log(this.rname);

        this.getFilteredMenuItems();
      });
    
    // Retrieve userId from localStorage
    this.userId = localStorage.getItem('userId');
  }

  getFilteredMenuItems() {
    console.log(this.selectedRestaurant);
    if (this.selectedRestaurant) {
      this.http
        .get<Menuitem[]>(
          `http://localhost:5145/api/MenuItem/ByRestaurant/${encodeURIComponent(
            this.rname || ''
          )}`
        )
        .subscribe(
          (response) => {
            this.menuItems = response.map((menuItem) => ({
              name: menuItem.name,
              description: menuItem.description,
              price: menuItem.price,
              menuItemId: menuItem.menuItemId,
              quantity: menuItem.quantity,
              image: menuItem.image,
            }));
            console.log('Fetched Menu Items:', this.menuItems);
            this.filteredMenuItems = this.menuItems;
          },
          (error) => {
            console.error(
              'Error fetching menu items by restaurant from API',
              error
            );
          }
        );
    }
  }

  getRestaurantImage(m: any) {
    console.log(m);
    // Replace 'http://localhost:5145/Resources/Images/' with the actual base URL for restaurant images
    return `http://localhost:5145/Resources/Images/${m}`;
  }

  addToOrder(menuItem: Menuitem) {
    this.orderItems.push(menuItem);
  }

  submitOrder() {
    if (!this.userId) {
      console.error('User ID not found.');
      return;
    }

    const order = {
      userId: this.userId,
      items: this.orderItems,
      // Add any other properties you need for the order
    };

    this.http.post('http://localhost:5145/api/Order', order).subscribe(
      (response) => {
        console.log('Order submitted successfully:', response);
        this.orderItems = [];
        this.navigateToOrderList();
      },
      (error) => {
        console.error('Error submitting order:', error);
      }
    );
  }

  navigateToOrderList() {
    this.router.navigate(['/order-list']);
  }

  calculateTotalOrderPrice(): number {
    let totalPrice = 0;
    for (const orderItem of this.orderItems) {
      totalPrice += orderItem.quantity * orderItem.price;
    }
    return totalPrice;
  }
}
