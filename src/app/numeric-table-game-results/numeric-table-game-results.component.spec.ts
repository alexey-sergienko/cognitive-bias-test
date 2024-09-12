import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericTableGameResultsComponent } from './numeric-table-game-results.component';

describe('NumericTableGameResultsComponent', () => {
  let component: NumericTableGameResultsComponent;
  let fixture: ComponentFixture<NumericTableGameResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericTableGameResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericTableGameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
