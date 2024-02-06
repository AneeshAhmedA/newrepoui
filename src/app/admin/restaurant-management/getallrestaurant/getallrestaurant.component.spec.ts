import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallrestaurantComponent } from './getallrestaurant.component';

describe('GetallrestaurantComponent', () => {
  let component: GetallrestaurantComponent;
  let fixture: ComponentFixture<GetallrestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetallrestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetallrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
