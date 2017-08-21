import { IRESTful, Task, AppSettings } from '../';

export class Project implements IRESTful {
  id: number;
  name: string;
  tasks: Array<Task>;

  constructor() {}

  static get URL(): string { return AppSettings.PROJECT_URL; }

  getURL(): string { return `${Project.URL}/${this.id}`; }
}