import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVehiculePersonnelComponent } from './new-vehicule-personnel.component';

describe('NewVehiculePersonnelComponent', () => {
  let component: NewVehiculePersonnelComponent;
  let fixture: ComponentFixture<NewVehiculePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVehiculePersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVehiculePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
