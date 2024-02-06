import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Menuitem } from '../../Models/menuitem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadImgComponent } from '../upload/upload.component';

@Component({
  selector: 'app-add-menu',
  standalone: true,
  imports: [CommonModule,FormsModule,UploadImgComponent,HttpClientModule],
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.css'
})
export class AddMenuComponent {
  menu:Menuitem;
      constructor(private http:HttpClient,private router:Router){
        this.menu = new Menuitem();
      }
      addMenu(){
        this.menu.image = localStorage.getItem('Menuitem-img');

        this.http
        .post('http://localhost:5145/api/MenuItem',this.menu)
        .subscribe((response)=>{
          console.log(response);
        });
        this.router.navigateByUrl('getallmenu');
      }
}
