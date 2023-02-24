import { TestBed } from '@angular/core/testing';

import { VehiculeSocieteService } from './vehicule-societe.service';

describe('VehiculeSocieteService', () => {
  let service: VehiculeSocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculeSocieteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
