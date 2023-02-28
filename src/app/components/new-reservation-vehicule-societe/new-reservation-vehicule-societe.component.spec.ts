import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReservationVehiculeSocieteComponent } from './new-reservation-vehicule-societe.component';

describe('NewReservationVehiculeSocieteComponent', () => {
  let component: NewReservationVehiculeSocieteComponent;
  let fixture: ComponentFixture<NewReservationVehiculeSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReservationVehiculeSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReservationVehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
