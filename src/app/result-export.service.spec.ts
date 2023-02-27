import { TestBed } from '@angular/core/testing';

import { ResultExportService } from './result-export.service';

describe('ResultExportService', () => {
  let service: ResultExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
