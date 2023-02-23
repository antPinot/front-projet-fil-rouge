import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReservationCovoiturageComponent } from './single-reservation-covoiturage.component';

describe('SingleReservationCovoiturageComponent', () => {
  let component: SingleReservationCovoiturageComponent;
  let fixture: ComponentFixture<SingleReservationCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleReservationCovoiturageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleReservationCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
