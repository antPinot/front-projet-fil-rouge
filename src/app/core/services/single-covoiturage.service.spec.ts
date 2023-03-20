import { TestBed } from '@angular/core/testing';

import { SingleCovoiturageService } from './single-covoiturage.service';

describe('SingleCovoiturageService', () => {
  let service: SingleCovoiturageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleCovoiturageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
