import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericTableGameMenuComponent } from './numeric-table-game-menu.component';

describe('NumericTableGameMenuComponent', () => {
  let component: NumericTableGameMenuComponent;
  let fixture: ComponentFixture<NumericTableGameMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericTableGameMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericTableGameMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
