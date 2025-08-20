import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsOurHistory } from './about-us-our-history';

describe('AboutUsOurHistory', () => {
  let component: AboutUsOurHistory;
  let fixture: ComponentFixture<AboutUsOurHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsOurHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsOurHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
