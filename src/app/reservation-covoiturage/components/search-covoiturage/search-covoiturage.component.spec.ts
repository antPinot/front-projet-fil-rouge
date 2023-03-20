import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCovoiturageComponent } from './search-covoiturage.component';

describe('SearchCovoiturageComponent', () => {
  let component: SearchCovoiturageComponent;
  let fixture: ComponentFixture<SearchCovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCovoiturageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
