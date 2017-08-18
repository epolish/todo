export class AppSettings {
  private static _API_URL: string = 'api/';
  static get API_URL(): string { return AppSettings._API_URL; }
  
  private static _TASK_URL: string = `${AppSettings.API_URL}tasks`;
  static get TASK_URL(): string { return AppSettings._TASK_URL; }

  private static _PROJECT_URL: string = `${AppSettings.API_URL}projects`;
  static get PROJECT_URL(): string { return AppSettings._PROJECT_URL; }
}