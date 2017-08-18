import {
  OnInit,
  Component,
  ComponentRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef 
} from '@angular/core';

import { ProjectComponent } from '../project/project.component';
import { AppSettings, AppService, IRESTful, Project } from '../shared';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'todo',
  providers: [AppService],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('projectContainer', { read: ViewContainerRef }) projectContainer: ViewContainerRef;
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appService: AppService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {}
  
  ngOnInit(): void {
    this.getProjects();
  }

  startLoading(): void {
    this.slimLoadingBarService.start();
  }

  completeLoading(): void {
    this.slimLoadingBarService.complete();
  }

  getProjects(): void {
    this.startLoading();
    this.appService.get(Project.URL).then(projects => {
        projects.forEach(project => {
          this.renderProject(project as Project);
        });
        this.completeLoading();
      }
    );
  }

  addProject(): void {
    this.startLoading();
    this.appService
      .create({
        name: 'New project',
        getURL: (): string => Project.URL
      } as IRESTful)
      .then(project => {
        this.renderProject(project as Project);
        this.completeLoading();
      });
  }

  renderProject(project: Project = null): void {
    const componentFactory: ComponentFactory<ProjectComponent> = 
      this.componentFactoryResolver.resolveComponentFactory(ProjectComponent);
    let componentReference: ComponentRef<ProjectComponent> = 
      this.projectContainer.createComponent(componentFactory);
    componentReference.instance.project = project;
    componentReference.instance.projectCmpRef = componentReference;
  }
}
