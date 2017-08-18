import { AppSettings } from './app-settings';
import { Project } from './project'

describe('Project', () => {
  let project;
  
  beforeEach(() => {
    project = new Project();
  });

  it('should create an instance', () => {
    expect(project).toBeTruthy();
  });

  it('should return api string from getURL method', () => {
    expect(project.getURL()).toEqual(`${AppSettings.PROJECT_URL}/${project.id}`);
  });

  it('should not instantiate with the any fields', () => {
    expect(project.id).toBeUndefined();
    expect(project.name).toBeUndefined();
    expect(project.tasks).toBeUndefined();
  });

});
