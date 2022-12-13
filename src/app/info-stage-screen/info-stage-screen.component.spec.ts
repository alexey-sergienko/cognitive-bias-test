import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStageScreenComponent } from './info-stage-screen.component';

describe('InfoStageScreenComponent', () => {
  let component: InfoStageScreenComponent;
  let fixture: ComponentFixture<InfoStageScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStageScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoStageScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
