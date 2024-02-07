import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Cartitem } from '../../Models/cartitem';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Menuitem } from '../../Models/menuitem';
import { Res } from '../../Models/res';

@Component({
  selector: 'app-view-cart',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent {
  

}