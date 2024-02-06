import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Menuitem } from '../../Models/menuitem';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-menu',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './get-menu.component.html',
  styleUrl: './get-menu.component.css'
})
export class GetMenuComponent {
  menu:Menuitem[] = [];
  constructor(private http:HttpClient,private router:Router){
    this.getAllMenu();
  }
  getAllMenu(){
    this.http
    .get<Menuitem[]>('http://localhost:5145/api/MenuItem')
    .subscribe((response)=>{
      this.menu = response;
      console.log(this.menu);
    }
    );
  }
}
