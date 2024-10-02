import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamQuestionsComponent } from './add-exam-questions.component';

describe('AddExamQuestionsComponent', () => {
  let component: AddExamQuestionsComponent;
  let fixture: ComponentFixture<AddExamQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExamQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
