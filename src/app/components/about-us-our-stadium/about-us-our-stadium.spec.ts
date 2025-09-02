import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsOurStadium } from './about-us-our-stadium';

describe('AboutUsOurStadium', () => {
  let component: AboutUsOurStadium;
  let fixture: ComponentFixture<AboutUsOurStadium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsOurStadium]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsOurStadium);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
