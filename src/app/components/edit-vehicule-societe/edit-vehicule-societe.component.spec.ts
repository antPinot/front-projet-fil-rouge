import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiculeSocieteComponent } from './edit-vehicule-societe.component';

describe('EditVehiculeSocieteComponent', () => {
  let component: EditVehiculeSocieteComponent;
  let fixture: ComponentFixture<EditVehiculeSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehiculeSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
