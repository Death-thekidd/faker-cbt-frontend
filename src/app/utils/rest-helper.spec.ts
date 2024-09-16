import { TestBed } from '@angular/core/testing';

import { RestHelper } from './rest-helper';

describe('RestHelper', () => {
  let service: RestHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
