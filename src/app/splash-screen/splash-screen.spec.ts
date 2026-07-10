import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSplash } from './screen-splash';

describe('ScreenSplash', () => {
  let component: ScreenSplash;
  let fixture: ComponentFixture<ScreenSplash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenSplash],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenSplash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
