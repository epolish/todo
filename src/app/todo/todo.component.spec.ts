import { TestBed, async, getTestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ComponentFactoryResolver } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TodoComponent } from './todo.component';
import { AppService } from '../shared';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

describe('TodoComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [HttpModule],
      providers: [
        ComponentFactoryResolver,
        AppService,
        SlimLoadingBarService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(TodoComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
  it('should call ngOnInit', () => {
    getTestBed().compileComponents().then(() => { 
      const fixture = getTestBed().createComponent(TodoComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(app, 'ngOnInit').and.callThrough();
    });
  });
  
});