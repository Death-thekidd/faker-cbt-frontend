import { TestBed } from '@angular/core/testing';

import { ExamstudentService } from './examstudent.service';

describe('ExamstudentService', () => {
  let service: ExamstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
