import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationVehiculeSocieteComponent } from './list-reservation-vehicule-societe.component';

describe('ListReservationVehiculeSocieteComponent', () => {
  let component: ListReservationVehiculeSocieteComponent;
  let fixture: ComponentFixture<ListReservationVehiculeSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservationVehiculeSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReservationVehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
