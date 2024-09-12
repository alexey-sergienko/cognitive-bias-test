import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericTableGameComponent } from './numeric-table-game.component';

describe('NumericTableGameComponent', () => {
  let component: NumericTableGameComponent;
  let fixture: ComponentFixture<NumericTableGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericTableGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericTableGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
