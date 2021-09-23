import { TestBed } from '@angular/core/testing';

import { SimulateRequestsService } from './simulate-requests.service';

describe('SimulateRequestsService', () => {
  let service: SimulateRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulateRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
