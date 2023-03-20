import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReservationVehiculeComponent } from './single-reservation-vehicule.component';

describe('SingleReservationVehiculeComponent', () => {
  let component: SingleReservationVehiculeComponent;
  let fixture: ComponentFixture<SingleReservationVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleReservationVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleReservationVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
