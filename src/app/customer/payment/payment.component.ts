import { Component, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as emailjs from 'emailjs-com';
import { User } from '../../Models/user';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  totalPrice: number = 0;
  selectedCoupon: any;
  couponOptions: any[] = [];
  user: User;

  constructor(private router: Router, private http: HttpClient) {
    this.user = new User();
    // Retrieve total price from localStorage or wherever you store it
    this.totalPrice = parseFloat(localStorage.getItem('totalPrice') || '0');
    // Fetch coupon options from your API
    this.http.get<any[]>('http://localhost:5145/api/Coupon/GetAllCoupons').subscribe(
      (response) => {
        this.couponOptions = response;
      },
      (error) => {
        console.error('Error fetching coupons from API', error);
      }
    );
  }

  applyCoupon() {
    if (this.selectedCoupon) {
      // Apply discount when a coupon is selected
      this.totalPrice -= this.selectedCoupon.discountAmount;
    }
  }
  proceedToPayment() {
    console.log('Payment success');
  }
  
}

