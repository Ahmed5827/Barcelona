import { TestBed } from '@angular/core/testing';

import { Squad } from './squad';

describe('Squad', () => {
  let service: Squad;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Squad);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
