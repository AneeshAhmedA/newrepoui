import { Component, OnInit } from '@angular/core';
import { Order } from '../../Models/order';
import { User } from '../../Models/user';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './order-by-id.component.html',
  styleUrl: './order-by-id.component.css'
})
export class OrderByIdComponent implements OnInit {
  userID?: number = 0;
  user: User;
  errMsg: string = '';
  isUserExist: boolean = false;
  originalUser: User;

  orders: Order[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.user = {} as User;
    this.originalUser = {} as User;
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params) => {
      this.userID = +params['uid'];
      this.search();
      this.getOrdersByUserId();
    });
  }

  search() {
    this.http
      .get<User>('http://localhost:5145/api/User/' + this.userID)
      .subscribe((response) => {
        if (response != null) {
          this.user = response;
          this.originalUser = { ...this.user };
          this.isUserExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid User Id';
          this.isUserExist = false;
        }
      });
  }

  getOrdersByUserId() {
    this.http
      .get<Order[]>('http://localhost:5145/api/Order/GetOrdersByUserId/' + this.userID)
      .subscribe(
        (response) => {
          this.orders = response;
        },
        (error) => {
          console.error('Error fetching orders by user ID', error);
        }
      );
  }
}
