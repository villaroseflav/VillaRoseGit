import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillaroseTableComponent } from './villarose-table.component';

describe('VillaroseTableComponent', () => {
  let component: VillaroseTableComponent;
  let fixture: ComponentFixture<VillaroseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillaroseTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillaroseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
