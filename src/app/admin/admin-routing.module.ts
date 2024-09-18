import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './pages/user/users/users.component';
import { QuestionTypesComponent } from './pages/question/question-types/question-types.component';
import { QuestionsComponent } from './pages/question/questions/questions.component';

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
        path: 'questions',
        component: QuestionsComponent,
        data: { title: 'Questions' },
      },
      {
        path: 'question-types',
        component: QuestionTypesComponent,
        data: { title: 'Question Types' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
