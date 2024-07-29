import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-alumno',
  templateUrl: './ingreso-alumno.component.html',
  styleUrls: ['./ingreso-alumno.component.css']
})
export class IngresoAlumnoComponent {
    constructor(private fb : FormBuilder){

    }

    formNuevoAlumno = this.fb.group({
      nombre : ['',Validators.required],
      apellido : ['',Validators.required],
      email : ['',Validators.required],
      telefono : ['',Validators.required],
      disciplina : ['',Validators.required],
      plan : ['',Validators.required]
    });

    submit(){
      console.log(this.formNuevoAlumno.value);
    }
}
