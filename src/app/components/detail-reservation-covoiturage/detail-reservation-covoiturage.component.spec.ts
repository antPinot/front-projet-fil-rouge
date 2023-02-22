import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReservationCovoiturageComponent } from './detail-reservation-covoiturage.component';

describe('DetailReservationCovoiturageComponent', () => {
  let component: DetailReservationCovoiturageComponent;
  let fixture: ComponentFixture<DetailReservationCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailReservationCovoiturageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailReservationCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
