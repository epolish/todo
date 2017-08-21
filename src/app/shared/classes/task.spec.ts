import { AppSettings, Task } from '../';

describe('Task', () => {
  let task;
  
  beforeEach(() => {
    task = new Task({id: 0, name: 'name', status: false,
      expires: new Date, position: 0, project_id: 0} as Task);
  });

  it('should create an instance', () => {
    expect(task).toBeTruthy();
  });

  it('should return api string from getURL method', () => {
    expect(task.getURL()).toEqual(`${AppSettings.TASK_URL}/${task.id}`);
  });

  it('should instantiate with the same fields', () => {
    let _task = new Task(task);
    expect(_task.id).toEqual(task.id);
    expect(_task.name).toEqual(task.name);
    expect(_task.status).toEqual(task.status);
    expect(_task.expires).toEqual(task.expires);
    expect(_task.position).toEqual(task.position);
    expect(_task.project_id).toEqual(task.project_id);
  });

});
