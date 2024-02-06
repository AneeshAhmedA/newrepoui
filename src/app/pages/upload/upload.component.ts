import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Menuitem } from '../../Models/menuitem';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadImgComponent {
  progress?: number;
  message?: string;
  item: Menuitem;
  constructor(private http: HttpClient) {
    this.item = new Menuitem();
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    localStorage.setItem('Menuitem-img',fileToUpload.name);
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
