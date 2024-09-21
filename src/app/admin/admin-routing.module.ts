import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './pages/user/users/users.component';
import { QuestionTypesComponent } from './pages/question/question-types/question-types.component';
import { QuestionsComponent } from './pages/question/questions/questions.component';
import { AddQuestionComponent } from './pages/question/add-question/add-question.component';
import { AddBulkQuestionsComponent } from './pages/question/add-bulk-questions/add-bulk-questions.component';
import { ExamsComponent } from './pages/exam/exams/exams.component';
import { AddExamComponent } from './pages/exam/add-exam/add-exam.component';
import { ExamTypesComponent } from './pages/exam/exam-types/exam-types.component';
import { ExamResultComponent } from './pages/exam/exam-result/exam-result.component';
import { EditExamComponent } from './pages/exam/edit-exam/edit-exam.component';
import { FacultyComponent } from './pages/categories/faculty/faculty.component';
import { SemesterComponent } from './pages/categories/semester/semester.component';
import { SessionComponent } from './pages/categories/session/session.component';
import { LevelComponent } from './pages/categories/level/level.component';
import { DepartmentComponent } from './pages/categories/department/department.component';
import { CourseComponent } from './pages/categories/course/course.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Users' },
      },
      {
        path: 'question/manage-questions',
        component: QuestionsComponent,
        data: { title: 'Questions' },
      },
      {
        path: 'question/question-types',
        component: QuestionTypesComponent,
        data: { title: 'Question Types' },
      },
      {
        path: 'question/add',
        component: AddQuestionComponent,
        data: { title: 'Add Question' },
      },
      {
        path: 'question/add-bulk',
        component: AddBulkQuestionsComponent,
        data: { title: 'Add Bulk Question' },
      },
      {
        path: 'question/edit/:questionId',
        component: AddBulkQuestionsComponent,
        data: { title: 'Edit Question' },
      },
      {
        path: 'exam/manage-exams',
        component: ExamsComponent,
        data: { title: 'Manage Exams' },
      },
      {
        path: 'exam/add-exam',
        component: AddExamComponent,
        data: { title: 'Add Exam' },
      },
      {
        path: 'exam/exam-types',
        component: ExamTypesComponent,
        data: { title: 'Exam Types' },
      },
      {
        path: 'exam/exam-results',
        component: ExamResultComponent,
        data: { title: 'Exam Results' },
      },
      {
        path: 'exam/edit-exam/:examId',
        component: EditExamComponent,
        data: { title: 'Edit Exam' },
      },
      {
        path: 'category/manage-semesters',
        component: SemesterComponent,
        data: { title: 'Manage Semesters' },
      },
      {
        path: 'category/manage-sessions',
        component: SessionComponent,
        data: { title: 'Manage Sessions' },
      },
      {
        path: 'category/manage-levels',
        component: LevelComponent,
        data: { title: 'Manage Levels' },
      },
      {
        path: 'category/manage-departments',
        component: DepartmentComponent,
        data: { title: 'Manage Departments' },
      },
      {
        path: 'category/manage-faculties',
        component: FacultyComponent,
        data: { title: 'Manage Faculties' },
      },
      {
        path: 'category/manage-courses',
        component: CourseComponent,
        data: { title: 'Manage Courses' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
