import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {
  constructor(private http: HttpClient) {}

  downloadFile() {
    const fileName = 'parotta'; 
    const apiUrl = `http://localhost:5145/api/ImageUpload/`;
    
    this.http
      .get(apiUrl, {
        responseType: 'arraybuffer',
        observe: 'events',
        reportProgress: true,
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.DownloadProgress) {
            // Handle download progress
            const percentDone = Math.round((100 * event.loaded) / event.total!);
            console.log(`File is ${percentDone}% downloaded.`);
          } else if (event instanceof HttpResponse) {
            // Handle successful download
            const blob = new Blob([event.body!], { type: event.headers.get('Content-Type')! });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }
        },
        (error) => {
          console.error('Download failed:', error);
        }
      );
  }
}