import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericTableGameSessionSelectionComponent } from './numeric-table-game-session-selection.component';

describe('NumericTableGameSessionSelectionComponent', () => {
  let component: NumericTableGameSessionSelectionComponent;
  let fixture: ComponentFixture<NumericTableGameSessionSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericTableGameSessionSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericTableGameSessionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
