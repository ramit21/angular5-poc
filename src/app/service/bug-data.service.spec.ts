import { TestBed, inject } from '@angular/core/testing';

import { BugDataService } from './bug-data.service';

describe('BugDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BugDataService]
    });
  });

  it('should be created', inject([BugDataService], (service: BugDataService) => {
    expect(service).toBeTruthy();
  }));
});
