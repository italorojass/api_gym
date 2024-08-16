import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private apiUrl = `${environment.HOST}/horarios`


  constructor(private http: HttpClient) {}

  getHorarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createHorario(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateHorario(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteHorario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
