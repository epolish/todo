import { AppSettings } from './app-settings';

describe('AppSettings', () => {
  
  it('should return the same task`s url', () => {
    expect(AppSettings.TASK_URL).toEqual(`${AppSettings.API_URL}tasks`);
  });
  
  it('should return the same project`s url', () => {
    expect(AppSettings.PROJECT_URL).toEqual(`${AppSettings.API_URL}projects`);
  });
  
});
