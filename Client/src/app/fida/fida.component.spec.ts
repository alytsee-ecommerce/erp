import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidaComponent } from './fida.component';

describe('FidaComponent', () => {
  let component: FidaComponent;
  let fixture: ComponentFixture<FidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
