import { TestBed } from '@angular/core/testing';

import { MainCashbookService } from './main-cashbook.service';

describe('MainCashbookService', () => {
  let service: MainCashbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainCashbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
