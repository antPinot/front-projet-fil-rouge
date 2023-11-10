import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageDetailedInfosComponent } from './covoiturage-detailed-infos.component';

describe('CovoiturageDetailedInfosComponent', () => {
  let component: CovoiturageDetailedInfosComponent;
  let fixture: ComponentFixture<CovoiturageDetailedInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovoiturageDetailedInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoiturageDetailedInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
