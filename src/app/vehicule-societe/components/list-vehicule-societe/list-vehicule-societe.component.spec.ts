import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVehiculeSocieteComponent } from './list-vehicule-societe.component';

describe('ListVehiculeSocieteComponent', () => {
  let component: ListVehiculeSocieteComponent;
  let fixture: ComponentFixture<ListVehiculeSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVehiculeSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVehiculeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
