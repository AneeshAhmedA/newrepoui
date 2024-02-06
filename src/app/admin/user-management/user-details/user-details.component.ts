import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userId?: number = 0;
  user: User; 
  errMsg: String = '';
  isUserExist: boolean = false;
  originalUser: User = {} as User;


  constructor(
    private http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.user = new User(); 
    this.activateRoute.params.subscribe((params) => (this.userId = params['uid']));
    console.log(this.userId);
    this.search();
  }

  search() {
    this.http
      .get<User>('http://localhost:5145/api/User/' + this.userId)
      .subscribe((response) => {
        console.log(response);
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
  edit() {
    this.http
      .put('http://localhost:5145/api/User/EditUser', this.user)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('admin-dashboard/users');
      });     
}


  delete() {
    this.userId = this.user.userID;
    this.http
      .delete('http://localhost:5145/api/User/' + this.userId)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('admin-dashboard/users');
      });
  }
  
}
