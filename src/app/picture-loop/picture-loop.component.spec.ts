import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureLoopComponent } from './picture-loop.component';

describe('PictureLoopComponent', () => {
  let component: PictureLoopComponent;
  let fixture: ComponentFixture<PictureLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureLoopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
