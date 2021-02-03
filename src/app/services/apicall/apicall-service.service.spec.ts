import { TestBed } from '@angular/core/testing';

import { ApicallServiceService } from './apicall-service.service';

describe('ApicallServiceService', () => {
  let service: ApicallServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicallServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
