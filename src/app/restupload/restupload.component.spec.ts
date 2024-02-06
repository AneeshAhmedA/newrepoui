import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuploadComponent } from './restupload.component';

describe('RestuploadComponent', () => {
  let component: RestuploadComponent;
  let fixture: ComponentFixture<RestuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestuploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
