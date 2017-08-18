import { IRESTful } from './abstract/i-restful'

import { AppSettings } from './app-settings';

export class Task implements IRESTful {
  id: number;
  name: string;
  status: boolean;
  expires: Date;
  position: number;
  project_id: number;

  constructor(task: Task) {
    this.id = task.id;
    this.name = task.name;
    this.status = task.status;
    this.expires = task.expires;
    this.position = task.position;
    this.project_id = task.project_id;
  }
  
  static get URL(): string { return AppSettings.TASK_URL; }

  getURL(): string { return `${Task.URL}/${this.id}`; }
}