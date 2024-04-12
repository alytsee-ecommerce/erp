import { TestBed } from '@angular/core/testing';

import { OtherExpencesService } from './other-expences.service';

describe('OtherExpencesService', () => {
  let service: OtherExpencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherExpencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
