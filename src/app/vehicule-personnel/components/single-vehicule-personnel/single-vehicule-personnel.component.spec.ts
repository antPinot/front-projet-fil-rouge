import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVehiculePersonnelComponent } from './single-vehicule-personnel.component';

describe('SingleVehiculePersonnelComponent', () => {
  let component: SingleVehiculePersonnelComponent;
  let fixture: ComponentFixture<SingleVehiculePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleVehiculePersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleVehiculePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
