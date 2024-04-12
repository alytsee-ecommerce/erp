import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwamidasTaxComponent } from './swamidas-tax.component';

describe('SwamidasTaxComponent', () => {
  let component: SwamidasTaxComponent;
  let fixture: ComponentFixture<SwamidasTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwamidasTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwamidasTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
