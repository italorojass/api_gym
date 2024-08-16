import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantenedoresService {

  constructor(private httpClient: HttpClient) { }
  HOST = environment.HOST;

  disciplinas(){
    return this.httpClient.get(`${this.HOST}/keys/disciplinas`);

  }

  horarios(disciplinaID : any){
    console.log(`${this.HOST}/keys/horarios/${disciplinaID}`)
    return this.httpClient.get(`${this.HOST}/keys/horarios/${disciplinaID}`);

  }

  crearAlumno(body : any){
    return this.httpClient.post(`${this.HOST}/alumno`,body)
  }

  getAlumnos(){
    return this.httpClient.get(`${this.HOST}/alumno`);
  }
  getDias(){
    return this.httpClient.get(`${this.HOST}/dias`);
  }

  getTimes(){
    return this.httpClient.get(`${this.HOST}/times`);
  }

  getInstructores(){
    return this.httpClient.get(`${this.HOST}/instructores`);

  }

  getWidgets(){
    return this.httpClient.get(`${this.HOST}/estadisticas`);

  }

}
