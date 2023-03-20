import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVehiculeSocieteComponent } from './single-vehicule-societe.component';

describe('SingleVehiculeSocieteComponent', () => {
  let component: SingleVehiculeSocieteComponent;
  let fixture: ComponentFixture<SingleVehiculeSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleVehiculeSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleVehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
