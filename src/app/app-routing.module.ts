import { NgModule } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { HelpComponent } from './help/help.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', redirectTo: '/help', pathMatch: 'full' },
  { path: 'help',  component: HelpComponent },
  { path: 'todo',  component: TodoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }