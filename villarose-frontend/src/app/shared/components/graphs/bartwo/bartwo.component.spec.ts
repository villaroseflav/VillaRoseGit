import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BartwoComponent } from './bartwo.component';

describe('BartwoComponent', () => {
  let component: BartwoComponent;
  let fixture: ComponentFixture<BartwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BartwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BartwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
