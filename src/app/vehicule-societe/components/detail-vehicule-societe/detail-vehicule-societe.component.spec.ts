import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVehiculeSocieteComponent } from './detail-vehicule-societe.component';

describe('DetailVehiculeSocieteComponent', () => {
  let component: DetailVehiculeSocieteComponent;
  let fixture: ComponentFixture<DetailVehiculeSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailVehiculeSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailVehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
