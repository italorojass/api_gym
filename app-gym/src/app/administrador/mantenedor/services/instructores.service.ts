import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstructoresService {

  constructor(private http: HttpClient) {}
  private apiUrl = `${environment.HOST}/instructores`

  getInstructores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createInstructor(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateInstructor(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteInstructor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
