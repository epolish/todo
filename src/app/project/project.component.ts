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
  private _show: boolean = true;
  get show(): boolean {
    return this._show;
  }
  set show(show: boolean) {
    this._show = show;
  }

  private _project: Project;
  get project(): Project {
    return this._project;
  }
  set project(project: Project) {
    this._project = project;
  }

  private _projectCmpRef: ComponentRef<ProjectComponent>;
  get projectCmpRef(): ComponentRef<ProjectComponent> {
    return this._projectCmpRef;
  }
  set projectCmpRef(projectCmpRef: ComponentRef<ProjectComponent>) {
    this._projectCmpRef = projectCmpRef;
  }

  private _focusTriggeringEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  get focusTriggeringEventEmitter(): EventEmitter<boolean> {
    return this._focusTriggeringEventEmitter;
  }
  set focusTriggeringEventEmitter(focusTriggeringEventEmitter: EventEmitter<boolean>) {
    this._focusTriggeringEventEmitter = focusTriggeringEventEmitter;
  }

  @HostBinding('@.disabled') disabled: boolean = false;

  constructor(
    private appService: AppService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {}

  focusTaskName(element): void {
    element.focus();
  }

  focusProjectName(): void {
    this._focusTriggeringEventEmitter.emit(true);
  }

  startLoading(): void {
    this.slimLoadingBarService.start();
  }

  completeLoading(): void {
    this.slimLoadingBarService.complete();
  }

  ngOnInit(): void { 
    if(this.project.tasks) {
      this.project.tasks.map(value => value.expires = new Date(value.expires));
    }
  }

  completeProjectEditing(name): void {
    name = name.trim();
    if(this._project.name !== name) {
      let project = new Project();
      project.id = this._project.id;
      project.name = name || 'New project';
      this._project.name = project.name;
      this.startLoading();
      this.appService.update(project as IRESTful).then(() => this.completeLoading());
    }
  }

  droppedSuccess(task, newPosition): void {
    if(task.position !== newPosition) {
      task.position = newPosition;
      this.updateTask(task);
    }
  }

  createTask(name: string): void {
    this.startLoading();
    this.appService.create({
      name: name || 'New task',
      status: false,
      expires: new Date(),
      project_id: this._project.id,
      getURL: (): string => Task.URL
    } as IRESTful).then(
      task => {
        (task as Task).expires = new Date((task as Task).expires)
        this._project.tasks = this._project.tasks || [];
        this._project.tasks.push(task as Task);
        this.completeLoading();
      }
    );
  }

  updateTask(task): void { 
    this.startLoading();
    this.appService.update(new Task(task) as IRESTful).then(() => this.completeLoading()); 
  }

  updateTaskName(task, name: string = null): void {
    name = name.trim();
    if(task.name !== name) {
      task.name = name || 'Enter a name for the task';
      this.updateTask(task);
    }
  }
  
  deleteProject(): void {
    let project = new Project();
    project.id = this._project.id;
    if(this._projectCmpRef &&
      confirm(`Are you shure to delete the project ${this.project.name}?`)) {
      this.show = false;
      this.startLoading();
      this.appService
        .delete(project as IRESTful)
        .then(() => {
          this._projectCmpRef.destroy();
          this.completeLoading();
        });
    }
  }

  deleteTask(task): void {
    this.startLoading()
    this.appService.delete(new Task(task) as IRESTful).then(
      () => {
        this._project.tasks = this._project.tasks.filter(item => item !== task);
        this.completeLoading();
      }        
    );
  }
}
