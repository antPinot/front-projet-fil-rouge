import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReservationCovoiturageComponent } from './new-reservation-covoiturage.component';

describe('NewReservationCovoiturageComponent', () => {
  let component: NewReservationCovoiturageComponent;
  let fixture: ComponentFixture<NewReservationCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReservationCovoiturageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReservationCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
