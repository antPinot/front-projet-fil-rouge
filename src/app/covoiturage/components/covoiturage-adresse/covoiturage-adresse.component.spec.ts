import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageAdresseComponent } from './covoiturage-adresse.component';

describe('CovoiturageAdresseComponent', () => {
  let component: CovoiturageAdresseComponent;
  let fixture: ComponentFixture<CovoiturageAdresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovoiturageAdresseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoiturageAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
