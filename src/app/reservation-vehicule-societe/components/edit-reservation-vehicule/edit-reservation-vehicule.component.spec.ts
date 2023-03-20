import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservationVehiculeComponent } from './edit-reservation-vehicule.component';

describe('EditReservationVehiculeComponent', () => {
  let component: EditReservationVehiculeComponent;
  let fixture: ComponentFixture<EditReservationVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReservationVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReservationVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
