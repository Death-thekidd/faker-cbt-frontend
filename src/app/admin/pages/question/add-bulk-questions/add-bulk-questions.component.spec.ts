import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkQuestionsComponent } from './add-bulk-questions.component';

describe('AddBulkQuestionsComponent', () => {
  let component: AddBulkQuestionsComponent;
  let fixture: ComponentFixture<AddBulkQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBulkQuestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBulkQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
