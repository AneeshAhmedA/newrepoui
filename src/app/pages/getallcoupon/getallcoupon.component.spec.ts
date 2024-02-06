import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallcouponComponent } from './getallcoupon.component';

describe('GetallcouponComponent', () => {
  let component: GetallcouponComponent;
  let fixture: ComponentFixture<GetallcouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetallcouponComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetallcouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
