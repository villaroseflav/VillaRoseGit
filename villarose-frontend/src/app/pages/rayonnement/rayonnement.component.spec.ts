import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayonnementComponent } from './rayonnement.component';

describe('RayonnementComponent', () => {
  let component: RayonnementComponent;
  let fixture: ComponentFixture<RayonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RayonnementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RayonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
