import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamStudentsComponent } from './add-exam-students.component';

describe('AddExamStudentsComponent', () => {
  let component: AddExamStudentsComponent;
  let fixture: ComponentFixture<AddExamStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExamStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExamStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
