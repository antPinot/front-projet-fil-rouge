import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiculePersonnelComponent } from './edit-vehicule-personnel.component';

describe('EditVehiculePersonnelComponent', () => {
  let component: EditVehiculePersonnelComponent;
  let fixture: ComponentFixture<EditVehiculePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehiculePersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehiculePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
