import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageDetailsComponent } from './covoiturage-details.component';

describe('CovoiturageDetailsComponent', () => {
  let component: CovoiturageDetailsComponent;
  let fixture: ComponentFixture<CovoiturageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovoiturageDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoiturageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
