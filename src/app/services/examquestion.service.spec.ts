import { TestBed } from '@angular/core/testing';

import { ExamquestionService } from './examquestion.service';

describe('ExamquestionService', () => {
  let service: ExamquestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamquestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
