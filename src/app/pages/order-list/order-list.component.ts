import { Component } from '@angular/core';
import { Order } from '../../Models/order';
import { Coupon } from '../../Models/coupon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders: Order[] = [];
  userId: string | null;
  selectedCoupon: Coupon | null = null;
  couponOptions: Coupon[] = [];
  totalAmount: number = 0;
  oldTotalAmount: number = 0;
  discountedAmount: number = 0;
  selectedOrderForCoupon: Order | null = null; // Add this line

  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.getAllOrders();
      this.getCouponOptions();
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  getAllOrders() {
    const apiUrl = `http://localhost:5145/api/Order/GetOrdersByUserId/${this.userId}`;
    this.http.get<Order[]>(apiUrl).subscribe(orders => {
      this.orders = orders;
      this.calculateTotalAmount();
    });
  }

  getCouponOptions() {
    this.http.get<Coupon[]>('http://localhost:5145/api/Coupon/GetAllCoupons')
      .subscribe(coupons => this.couponOptions = coupons);
  }

  // Modify the method to accept the order as a parameter
  selectOrderForCoupon(order: Order) {
    this.selectedOrderForCoupon = order;
  }

  // Update this method to work with the selected order
  applyCouponForSelectedOrder() {
    if (this.selectedCoupon && this.selectedOrderForCoupon) {
      console.log('Applied Coupon:', this.selectedCoupon);
  
      // Ensure that this.selectedOrderForCoupon.totalPrice is defined before updating
      if (this.selectedOrderForCoupon.totalPrice !== undefined) {
        this.selectedOrderForCoupon.totalPrice -= this.selectedCoupon.discountAmount || 0;
        this.selectedOrderForCoupon.totalPrice = Math.max(0, this.selectedOrderForCoupon.totalPrice);
  
        // Reset selected order for coupon
        this.selectedOrderForCoupon = null;
  
        console.log('Updated Total Amount:', this.discountedAmount);
      } else {
        console.warn('Total Price is undefined for the selected order.');
      }
    } else {
      console.warn('No coupon selected.');
  
      this.oldTotalAmount = 0;
      this.discountedAmount = 0;
    }
  }
  

  calculateTotalAmount() {
    this.totalAmount = this.orders.reduce((total, order) => total + (order.totalPrice || 0), 0);
  }

  performDummyPayment() {
    console.log('Initiating Payment');
    setTimeout(() => {
      console.log('Payment Successful');
      alert('Thank you for your order! Have a Great Day!!!.');
    }, 200);
  }

  placeOrder(order: Order) {
    console.log(`Placing Order for Order ID: ${order.orderId}`);
    console.log('Order Placed Successfully');
  }

  addCoupon(order: Order) {
    console.log(`Adding Coupon for Order ID: ${order.orderId}`);
    // Your coupon logic goes here
  }
}