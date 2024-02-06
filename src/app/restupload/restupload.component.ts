import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Restaurant } from '../Models/restaurant';

@Component({
  selector: 'app-restupload',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './restupload.component.html',
  styleUrl: './restupload.component.css'
})
export class RestuploadComponent {
  progress?: number;
  message?: string;
  restaurant: Restaurant;

  constructor(private http: HttpClient) {
    this.restaurant = new Restaurant();
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    localStorage.setItem('Restaurant-img', fileToUpload.name);

    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http
      .post('http://localhost:5145/api/ImageUpload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event) => {
          if (
            event.type === HttpEventType.UploadProgress &&
            event.total != undefined
          )
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  };
}
