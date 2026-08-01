import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapesAndNumbersGameComponent } from './shapes-and-numbers-game.component';

describe('ShapesAndNumbersGameComponent', () => {
  let component: ShapesAndNumbersGameComponent;
  let fixture: ComponentFixture<ShapesAndNumbersGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapesAndNumbersGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapesAndNumbersGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
