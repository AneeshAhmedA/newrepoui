import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySortingComponent } from './city-sorting.component';

describe('CitySortingComponent', () => {
  let component: CitySortingComponent;
  let fixture: ComponentFixture<CitySortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySortingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitySortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
