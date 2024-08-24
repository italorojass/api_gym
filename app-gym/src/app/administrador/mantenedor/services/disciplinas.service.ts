import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  constructor(private httpClient: HttpClient) { }
  HOST = environment.HOST;

  getDisciplinas(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.HOST}/disciplinasMantenedor`);
  }

  getDisciplinas2(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.HOST}/disciplinas`);
  }

  createDisciplina(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.HOST}/disciplinas`, data);
  }

  updateDisciplina(id: number, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.HOST}/disciplinas/${id}`, data);
  }

  deleteDisciplina(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.HOST}/disciplinas/${id}`);
  }

}
