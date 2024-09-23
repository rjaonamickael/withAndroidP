import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { UsersComponent } from './users/users.component';
import { TaskUserComponent } from './task-user/task-user.component';
const routes: Routes = [
  {path: '', component: TaskListComponent, canActivate: [AuthGuard]},
  {path: 'taskuser/:uid', component: TaskUserComponent, canActivate: [AuthGuard]},
  {path: 'task/:id', component: TaskDetailComponent, canActivate: [AuthGuard]},
  {path: 'edit-task/:id', component: TaskEditComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'create', component: TaskCreateComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent , canActivate: [AuthGuard]}, // Page d'accueil
  { path: 'create', component: TaskCreateComponent }, // Composant pour créer une tâche
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
