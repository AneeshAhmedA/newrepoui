import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantByIdComponent } from './restaurant-by-id.component';

describe('RestaurantByIdComponent', () => {
  let component: RestaurantByIdComponent;
  let fixture: ComponentFixture<RestaurantByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
