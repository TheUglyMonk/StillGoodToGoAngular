import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentRecomendationsComponent } from './establishment-recomendations.component';

describe('EstablishmentRecomendationsComponent', () => {
  let component: EstablishmentRecomendationsComponent;
  let fixture: ComponentFixture<EstablishmentRecomendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentRecomendationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstablishmentRecomendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
