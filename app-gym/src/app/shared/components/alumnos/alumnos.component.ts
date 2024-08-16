import { Component, Input, OnInit } from '@angular/core';
import { MantenedoresService } from '../../services/mantenedores.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  @Input() insertaAlumno = new Subject();
  constructor(private mantenedorSV :MantenedoresService){

  }

  ngOnInit(): void {
    this.getAlumnos();

    if(this.insertaAlumno){
      this.insertaAlumno.subscribe(r=>{
        this.getAlumnos();
      })
    }
  }

  alumnos:any=[];
  today = new Date();
  getAlumnos(){
    this.mantenedorSV.getAlumnos().subscribe((r:any)=>{
      this.alumnos = r.map((alumno:any)=>{
        const today = new Date();
        const paymentDueDate = new Date(alumno.PaymentDueDate);

        // Agregar la propiedad IsOverdue basada en la comparación de fechas
        alumno.IsOverdue = paymentDueDate < today;

        return alumno;
      });

      console.log(this.alumnos);
    })
  }
}
