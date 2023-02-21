import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVehiculePersonnelComponent } from './list-vehicule-personnel.component';

describe('ListVehiculePersonnelComponent', () => {
  let component: ListVehiculePersonnelComponent;
  let fixture: ComponentFixture<ListVehiculePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVehiculePersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVehiculePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
