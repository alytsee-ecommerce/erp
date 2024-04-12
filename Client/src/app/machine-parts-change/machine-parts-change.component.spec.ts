import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinePartsChangeComponent } from './machine-parts-change.component';

describe('MachinePartsChangeComponent', () => {
  let component: MachinePartsChangeComponent;
  let fixture: ComponentFixture<MachinePartsChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinePartsChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachinePartsChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
