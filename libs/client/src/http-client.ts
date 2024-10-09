// an injectable service that wraps the Angular HttpClient service and adds the base URL to all requests
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:7661';

  constructor(private http: HttpClient) {
    this.get = this.createMethod('get');
    this.post = this.createMethod('post');
    this.put = this.createMethod('put');
    this.delete = this.createMethod('delete');
  }

  get: <T>(url: string, options?: any) => Observable<T>;
  post: <T>(url: string, body: any, options?: any) => Observable<T>;
  put: <T>(url: string, body: any, options?: any) => Observable<T>;
  delete: <T>(url: string, options?: any) => Observable<T>;

  private createMethod(method: 'get' | 'post' | 'put' | 'delete') {
    return <T>(url: string, ...args: any[]): Observable<T> => {
      const fullUrl = `${this.baseUrl}${url}`;
      return (this.http[method] as Function).bind(this.http)(fullUrl, ...args);
    };
  }
}
