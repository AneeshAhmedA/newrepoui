import { CommonModule } from '@angular/common';
import { Component,OnInit} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router){}
  logout():void{
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
