import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {


  private apiUrl = `${environment.HOST}/disciplinas`

  constructor(private http: HttpClient) {}

  setPrecioDisciplina(disciplinaId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${disciplinaId}/precio`, data);
  }

  updatePrecioDisciplina(disciplinaId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${disciplinaId}/precio`, data);
  }
}
