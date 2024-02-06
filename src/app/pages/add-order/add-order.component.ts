import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../Models/order';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent {
  order: Order;

  constructor(private http: HttpClient, private router: Router) {
    this.order = new Order();
  }

  addOrder() {
    this.http
      .post('http://localhost:5145/api/Order', this.order)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('order-list');
  }

}
