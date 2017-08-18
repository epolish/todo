import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app/app.component';
import { HelpComponent } from './help/help.component';
import { TodoComponent } from './todo/todo.component';
import { ProjectComponent } from './project/project.component';
import { FocusDirective, AppService } from './shared';
import { DndModule } from 'ng2-dnd';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DatepickerModule } from 'angular2-material-datepicker';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './shared';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    TodoComponent,
    ProjectComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    DndModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    DatepickerModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }),
    AppRoutingModule
  ],
  providers: [
    AppService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProjectComponent]
})
export class AppModule { }