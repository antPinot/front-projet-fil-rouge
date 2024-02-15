import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageConfirmComponent } from './covoiturage-confirm.component';

describe('CovoiturageConfirmComponent', () => {
  let component: CovoiturageConfirmComponent;
  let fixture: ComponentFixture<CovoiturageConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovoiturageConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoiturageConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
