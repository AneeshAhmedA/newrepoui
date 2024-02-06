import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetResByCityComponent } from './get-res-by-city.component';

describe('GetResByCityComponent', () => {
  let component: GetResByCityComponent;
  let fixture: ComponentFixture<GetResByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetResByCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetResByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
