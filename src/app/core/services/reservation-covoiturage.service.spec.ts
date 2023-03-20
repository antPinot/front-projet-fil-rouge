import { TestBed } from '@angular/core/testing';

import { ReservationCovoiturageService } from './reservation-covoiturage.service';

describe('ReservationCovoiturageService', () => {
  let service: ReservationCovoiturageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationCovoiturageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
