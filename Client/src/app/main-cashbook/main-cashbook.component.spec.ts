import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCashbookComponent } from './main-cashbook.component';

describe('MainCashbookComponent', () => {
  let component: MainCashbookComponent;
  let fixture: ComponentFixture<MainCashbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCashbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCashbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
