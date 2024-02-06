import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent {
  orders: any[] = []; // Update this type based on your Order model

  constructor(private http: HttpClient) {
    this.getAllOrders();
  }

  getAllOrders() {
    // Fetch orders from the API
    this.http.get<any[]>('http://localhost:5145/api/Order')
      .subscribe((orders: any[]) => {
        this.orders = orders;
  
        // Assuming each order has a 'totalPrice' property
        const totalPrice = this.orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
  
        console.log('Total Price in localStorage:', totalPrice);
        localStorage.setItem('totalPrice', totalPrice.toString());
      });
  }

}

