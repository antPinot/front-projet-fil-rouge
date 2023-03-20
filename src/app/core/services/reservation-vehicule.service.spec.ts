import { TestBed } from '@angular/core/testing';

import { ReservationVehiculeService } from './reservation-vehicule.service';

describe('ReservationVehiculeService', () => {
  let service: ReservationVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
