import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MantenedoresService } from '../../services/mantenedores.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-ingreso-alumno',
  templateUrl: './ingreso-alumno.component.html',
  styleUrls: ['./ingreso-alumno.component.css']
})
export class IngresoAlumnoComponent implements OnInit{
    constructor(private fb : FormBuilder,
      private mansv : MantenedoresService,
      private toastr: ToastrService
    ){

    }

    ngOnInit(): void {
        this.getDisciplinas();

    }
    selectedDisciplina : any;
    selectedHorario : any;

    formNuevoAlumno = this.fb.group({
      nombre : ['',Validators.required],
      apellido : ['',Validators.required],
      email : ['',Validators.required],
      telefono : ['',Validators.required],
      disciplina : ['',Validators.required],
      plan : ['',Validators.required]
    });

    saveAlumno = new Subject<any>();
    submit(){
      console.log(this.formNuevoAlumno.value);
      let data = this.formNuevoAlumno.value;
      const today = new Date();

      let body = {
        name : `${data.nombre} ${data.apellido}`,
        email : data.email,
        enrollmentDate : moment(today).format('YYYY/MM/DD'),
        plans : data.plan,
        disciplines : data.disciplina
      }
      console.log(body);
      this.mansv.crearAlumno(body).subscribe((r:any)=>{
        console.log(r);
        this.formNuevoAlumno.reset();
        this.toastr.success('', r.message);
        this.saveAlumno.next(r);
      })
    }

    disciplinas :any = [];
    getDisciplinas(){
      this.mansv.disciplinas().subscribe((r:any)=>{
        //console.log(r);
        this.disciplinas = r;
        //console.log(this.disciplinas);
      })
    }


    horarios=[];
    getHorarios(){
      console.log(this.formNuevoAlumno.value.disciplina)
    if(this.formNuevoAlumno.value.disciplina?.length! > 0){
      this.mansv.horarios(this.formNuevoAlumno.value.disciplina).subscribe((r:any)=>{
        console.log(r);
        this.horarios = r.map((horarios:any) => ({
          ...horarios,
          displayName: `${horarios.TimeValue} - ${horarios.Disciplines}`
        }));
      })
    }else{
      this.horarios=[];
    }
    }

}
