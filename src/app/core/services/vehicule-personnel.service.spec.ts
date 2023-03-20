import { TestBed } from '@angular/core/testing';

import { VehiculePersonnelService } from './vehicule-personnel.service';

describe('VehiculePersonnelService', () => {
  let service: VehiculePersonnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculePersonnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
