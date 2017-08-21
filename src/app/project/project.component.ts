import {
  OnInit,
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
  EventEmitter,
  HostBinding
} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Subject } from 'rxjs';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatepickerModule as YourAlias } from 'angular2-material-datepicker'
import { AppSettings, AppService, IRESTful, Task, Project } from '../shared';

@Component({
  selector: 'project',
  providers: [AppService],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition(':leave', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ProjectComponent implements OnInit {
  private _project: Project;
  private _show: boolean = true;
  @HostBinding('@.disabled') disabled: boolean = false;
  private _projectCmpRef: ComponentRef<ProjectComponent>;
  private _taskNameChanged: Subject<string> = new Subject<string>();
  
  get show(): boolean { return this._show; }
  set show(show: boolean) { this._show = show; }

  get project(): Project { return this._project; }
  set project(project: Project) { this._project = project; }
  
  get projectCmpRef(): ComponentRef<ProjectComponent> {
    return this._projectCmpRef;
  }
  set projectCmpRef(projectCmpRef: ComponentRef<ProjectComponent>) { 
    this._projectCmpRef = projectCmpRef; 
  }

  constructor(
    private appService: AppService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this._taskNameChanged
       .debounceTime(300)
       .subscribe(value => this._createTask(value));
  }

  focusElement(element): void { element.focus(); }

  startLoading(): void { this.slimLoadingBarService.start(); }

  completeLoading(): void { this.slimLoadingBarService.complete(); }

  createTask(value: string): void { this._taskNameChanged.next(value); }

  ngOnInit(): void { 
    if(this.project.tasks) {
      this.project.tasks.map(
        value => value.expires = new Date(value.expires)
      );
    }
  }

  droppedSuccess(task: Task, newPosition: number): void {
    if(task.position !== newPosition) {
      task.position = newPosition;
      this.updateTask(task);
    }
  }

  completeProjectEditing(name: string): void {
    name = name.trim();
    if(this.project.name !== name) {
      let project = new Project();
      project.id = this.project.id;
      project.name = name || 'New project';
      this.project.name = project.name;
      this.startLoading();
      this.appService
        .update(project as IRESTful)
        .then(() => this.completeLoading());
    }
  }

  _createTask(value: string): void {
    this.startLoading();
    this.appService.create({
      name: value || 'New task',
      status: false,
      expires: new Date(),
      project_id: this.project.id,
      getURL: (): string => Task.URL
    } as IRESTful).then(
      task => {
        (task as Task).expires = new Date((task as Task).expires)
        this.project.tasks = this.project.tasks || [];
        this.project.tasks.push(task as Task);
        this.completeLoading();
      }
    );
  }

  updateTask(task: Task): void { 
    this.startLoading();
    this.appService
      .update(new Task(task) as IRESTful)
      .then(() => this.completeLoading()); 
  }

  updateTaskName(task: Task, name: string = null): void {
    name = name.trim();
    if(task.name !== name) {
      task.name = name || 'Enter a name for the task';
      this.updateTask(task);
    }
  }
  
  deleteProject(): void {
    let project = new Project();
    project.id = this.project.id;
    if(this.projectCmpRef &&
      confirm(`Are you shure to delete the project ${this.project.name}?`)) {
      this.show = false;
      this.startLoading();
      this.appService
        .delete(project as IRESTful)
        .then(() => {
          this.projectCmpRef.destroy();
          this.completeLoading();
        });
    }
  }

  deleteTask(task: Task): void {
    this.startLoading()
    this.appService.delete(new Task(task) as IRESTful).then(
      () => {
        this.project.tasks = this.project.tasks.filter(item => item !== task);
        this.completeLoading();
      }        
    );
  }
}
