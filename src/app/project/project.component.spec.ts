import { TestBed, async, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DndModule } from 'ng2-dnd';

import { ProjectComponent } from './project.component';
import { FocusDirective, AppService } from '../shared';

describe('ProjectComponent', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectComponent,
        FocusDirective
      ],
      imports: [
        HttpModule,
        FormsModule,
        DndModule.forRoot()
      ],
      providers: [
        AppService,
        SlimLoadingBarService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ProjectComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should call ngOnInit', () => {
    getTestBed().compileComponents().then(() => { 
      const fixture = getTestBed().createComponent(ProjectComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(app, 'ngOnInit').and.callThrough();
    });
  });
  
});