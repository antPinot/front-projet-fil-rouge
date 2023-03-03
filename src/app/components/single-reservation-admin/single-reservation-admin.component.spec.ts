import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReservationAdminComponent } from './single-reservation-admin.component';

describe('SingleReservationAdminComponent', () => {
  let component: SingleReservationAdminComponent;
  let fixture: ComponentFixture<SingleReservationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleReservationAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleReservationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
