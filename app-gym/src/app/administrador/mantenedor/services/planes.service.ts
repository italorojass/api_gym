import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private httpClient: HttpClient) { }
  HOST = environment.HOST;
  getPlanes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.HOST}/planes`);
  }

  createPlan(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.HOST}/planes`, data);
  }

  updatePlan(id: number, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.HOST}/planes/${id}`, data);
  }

  deletePlan(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.HOST}/planes${id}`);
  }
}
