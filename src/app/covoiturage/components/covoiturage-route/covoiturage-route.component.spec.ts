import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageRouteComponent } from './covoiturage-route.component';

describe('CovoiturageRouteComponent', () => {
  let component: CovoiturageRouteComponent;
  let fixture: ComponentFixture<CovoiturageRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovoiturageRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoiturageRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
