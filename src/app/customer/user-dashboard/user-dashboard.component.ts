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
export class UserDashboardComponent implements OnInit {
  showSidebar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialization code goes here
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}