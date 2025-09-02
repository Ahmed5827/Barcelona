import { TestBed } from '@angular/core/testing';

import { Coaches } from './coaches';

describe('Coaches', () => {
  let service: Coaches;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coaches);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
