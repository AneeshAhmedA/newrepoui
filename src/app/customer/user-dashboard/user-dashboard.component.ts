import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private router: Router){}
  logout():void{
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}