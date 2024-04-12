import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExpencesComponent } from './other-expences.component';

describe('OtherExpencesComponent', () => {
  let component: OtherExpencesComponent;
  let fixture: ComponentFixture<OtherExpencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherExpencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherExpencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
