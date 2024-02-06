import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMenuComponent } from './get-menu.component';

describe('GetMenuComponent', () => {
  let component: GetMenuComponent;
  let fixture: ComponentFixture<GetMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
