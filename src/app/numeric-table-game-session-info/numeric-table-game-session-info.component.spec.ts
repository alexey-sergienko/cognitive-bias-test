import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericTableGameSessionInfoComponent } from './numeric-table-game-session-info.component';

describe('NumericTableGameSessionInfoComponent', () => {
  let component: NumericTableGameSessionInfoComponent;
  let fixture: ComponentFixture<NumericTableGameSessionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericTableGameSessionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericTableGameSessionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
