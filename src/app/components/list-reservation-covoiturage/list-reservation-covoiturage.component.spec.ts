import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationCovoiturageComponent } from './list-reservation-covoiturage.component';

describe('ListReservationCovoiturageComponent', () => {
  let component: ListReservationCovoiturageComponent;
  let fixture: ComponentFixture<ListReservationCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservationCovoiturageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReservationCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
