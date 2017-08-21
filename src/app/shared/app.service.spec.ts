import { TestBed, inject } from '@angular/core/testing';
import { Headers, Http, HttpModule } from '@angular/http';

import { IRESTful, AppService, Project } from '.';

describe('AppService', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [AppService]
    });
  });

  it('should create an instance', () => {
    let appService = new AppService(null);
    expect(appService).toBeTruthy();
  });

  it('get() should return a Promise', inject([AppService], (service: AppService) => {
    expect(service.get(`${Project.URL}`) instanceof Promise).toBeTruthy();
  }));

  it('create() should return a Promise', inject([AppService], (service: AppService) => {
    let project = new Project();
    project.id = 0;
    expect(service.create(project) instanceof Promise).toBeTruthy();
  }));

  it('update() should return a Promise', inject([AppService], (service: AppService) => {
    let project = new Project();
    project.id = 0;
    expect(service.update(project) instanceof Promise).toBeTruthy();
  }));

  it('delete() should return a Promise', inject([AppService], (service: AppService) => {
    let project = new Project();
    project.id = 0;
    expect(service.delete(project) instanceof Promise).toBeTruthy();
  }));

});