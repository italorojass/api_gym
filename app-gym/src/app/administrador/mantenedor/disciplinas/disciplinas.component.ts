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
    nombreDisciplina :['',Validators.required],
    dias : ['',Validators.required],
    horario : ['',Validators.required],
    instructor : ['',Validators.required]
  })
  ngOnInit(): void {
    this.getDisciplinas();
    this.getDias();
    this.getHorarios();
    this.getInstructores();
  }

  submit(){

  }

  disciplinas :any = [];
  getDisciplinas(){
    this.disciplinasSV.getDisciplinas().subscribe((r:any)=>{
      //console.log(r);
      this.disciplinas = r;
      console.log(this.disciplinas);
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
    this.mansv.getInstructores().subscribe(r=>{
      this.instructores= r;
    })
  }


}
