import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageEditComponent } from './covoiturage-edit.component';

describe('CovoiturageEditComponent', () => {
  let component: CovoiturageEditComponent;
  let fixture: ComponentFixture<CovoiturageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovoiturageEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovoiturageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
