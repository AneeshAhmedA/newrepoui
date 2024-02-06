import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.css']
})
export class MenuSearchComponent {
  searchControl = new FormControl();
  suggestions: any[] = [];

  constructor(private http: HttpClient) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => this.searchMenuItems(query))
      )
      .subscribe(data => {
        this.suggestions = data;
      });
  }

  private searchMenuItems(query: string): Observable<any[]> { // Change the return type to Observable<any[]>
    return this.http.get<any[]>(`http://localhost:5145/api/MenuItem/Search/${query}`);
  }
}
