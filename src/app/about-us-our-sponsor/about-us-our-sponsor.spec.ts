import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsOurSponsor } from './about-us-our-sponsor';

describe('AboutUsOurSponsor', () => {
  let component: AboutUsOurSponsor;
  let fixture: ComponentFixture<AboutUsOurSponsor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsOurSponsor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsOurSponsor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
