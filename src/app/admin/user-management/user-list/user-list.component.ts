import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http
      .get<User[]>('http://localhost:5145/api/User/GetAllUsers')
      .subscribe(
        (response) => {
          this.users = response;
          console.log(this.users);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  }

}
