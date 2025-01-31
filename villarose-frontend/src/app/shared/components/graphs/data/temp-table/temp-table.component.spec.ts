import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempTableComponent } from './temp-table.component';

describe('TempTableComponent', () => {
  let component: TempTableComponent;
  let fixture: ComponentFixture<TempTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
