import { TestBed } from '@angular/core/testing';

import { QuestiontypeService } from './questiontype.service';

describe('QuestiontypeService', () => {
  let service: QuestiontypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestiontypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
