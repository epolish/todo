import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { IRESTful } from '.';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}
  
  get(url): Promise<IRESTful[]> {
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json().data as IRESTful[])
      .catch(this.handleError);
  }

  create(object: IRESTful): Promise<IRESTful> {
    return this.http
      .post(object.getURL(), JSON.stringify(object), {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as IRESTful)
      .catch(this.handleError);
  }

  update(object: IRESTful): Promise<IRESTful> {
    return this.http
      .put(object.getURL(), JSON.stringify(object), {headers: this.headers})
      .toPromise()
      .then(() => object)
      .catch(this.handleError);
  }

  delete(object: IRESTful): Promise<void> {
    return this.http
      .delete(object.getURL(), {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}