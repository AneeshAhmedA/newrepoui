import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByIdComponent } from './order-by-id.component';

describe('OrderByIdComponent', () => {
  let component: OrderByIdComponent;
  let fixture: ComponentFixture<OrderByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
