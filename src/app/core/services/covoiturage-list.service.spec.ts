import { TestBed } from '@angular/core/testing';

import { CovoiturageListService } from './covoiturage-list.service';

describe('CovoiturageListService', () => {
  let service: CovoiturageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovoiturageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
