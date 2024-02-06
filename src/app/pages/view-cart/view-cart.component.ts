import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cartitem } from '../../Models/cartitem';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Menuitem } from '../../Models/menuitem';
import { Res } from '../../Models/res';

@Component({
  selector: 'app-view-cart',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent {
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
  ) 
{

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
}