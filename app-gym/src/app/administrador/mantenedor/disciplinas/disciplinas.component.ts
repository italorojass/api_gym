import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MantenedoresService } from 'src/app/shared/services/mantenedores.service';
import { DisciplinasService } from '../services/disciplinas.service';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit{
  constructor(private fb : FormBuilder,
    private mansv : MantenedoresService,
    private disciplinasSV : DisciplinasService,
    private toastr: ToastrService){

  }

  selectedHorario : any;
  selectedDias : any;
  selectedInstructor : any;
  formDisciplina = this.fb.group({
    disciplina :['',Validators.required],
    descripcion : [''],
    //dias : ['',Validators.required],
    horarios : ['',Validators.required],
    instructores : ['',Validators.required]
  })
  ngOnInit(): void {
    this.getDisciplinas();
    this.getDias();
    //this.getHorarios();
    this.getInstructores();
  }

  submit(){
    console.log(this.formDisciplina.value);
   /*  this.disciplinasSV.createDisciplina(this.formDisciplina.value).subscribe(r=>{
      this.getDisciplinas();
    }) */
  }

  disciplinas :any = [];
  getDisciplinas(){
    this.disciplinasSV.getDisciplinas2().subscribe((r:any)=>{
      console.log('response disciplinas',r);
      this.disciplinas = r

      /* .filter((value:any, index:any, self:any) =>
        index === self.findIndex((t:any) => (
            t.Day === value.Day && t.Time === value.Time
        ))
      ); */

      /* console.log(this.disciplinas);
      const horarios= this.disciplinas.map((value:any)=>{
        let horarios = value.Schedules.filter((value:any, index:any, self:any) =>
          index === self.findIndex((t:any) => (
              t.Day === value.Day && t.Time === value.Time
          ))
        );

        return horarios;

      })
      console.log(horarios); */
    })
  }

  horarios : any=[];

  getHorarios(){
    this.mansv.getTimes().subscribe(r=>{
      this.horarios= r;
    })
  }

  dias:any=[];
  getDias(){
    this.mansv.getDias().subscribe(r=>{
      this.dias= r;
    })
  }

  instructores :any= [];
  getInstructores(){
    this.mansv.getInstructores().subscribe((r:any)=>{
      this.instructores= r.map((x:any)=>{
        return {
         ...x,
         nombreCompleto : `${x.nombre} ${x.apellido}`
        }
      });
      console.log(this.instructores);
    })
  }


}
