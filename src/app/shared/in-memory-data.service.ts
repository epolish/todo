import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {id: 1, name: 'Buy milk', status: false, expires: new Date(), position: 1},
      {id: 2, name: 'Change water filters', status: true,  expires: new Date(), position: 2},
      {id: 3, name: 'Schedule dentist appointment', status: false, expires: new Date(), position: 3}
    ],
    projects = [{id: 0, name: 'Shopping', tasks: tasks}];
    return {tasks, projects};
  }
}