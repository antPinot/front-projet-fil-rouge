import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehiculePersonnelComponent } from './delete-vehicule-personnel.component';

describe('DeleteVehiculePersonnelComponent', () => {
  let component: DeleteVehiculePersonnelComponent;
  let fixture: ComponentFixture<DeleteVehiculePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteVehiculePersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteVehiculePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
