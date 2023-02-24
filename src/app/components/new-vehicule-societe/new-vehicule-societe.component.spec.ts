import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeSocieteComponent } from './new-vehicule-societe.component';

describe('VehiculeSocieteComponent', () => {
  let component: VehiculeSocieteComponent;
  let fixture: ComponentFixture<VehiculeSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
