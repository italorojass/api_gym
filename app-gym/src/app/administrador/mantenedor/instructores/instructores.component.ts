import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MantenedoresService } from 'src/app/shared/services/mantenedores.service';
import { InstructoresService } from '../services/instructores.service';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css']
})
export class InstructoresComponent {
  instructores :any= [];
  getInstructores(){
    this.instructoresServices.getInstructores().subscribe(r=>{
      console.log(r);
      this.instructores= r;
    })
  }

  constructor(private fb : FormBuilder,
    private mansv : MantenedoresService,
    private instructoresServices : InstructoresService,
    private toastr: ToastrService){
    this.getInstructores();
  }

  formInstructores = this.fb.group({
    nombre : ['',Validators.required],
    apellido : ['',Validators.required],
    correo_electronico : ['',[Validators.required,Validators.email]],
    telefono : ['',Validators.required],
    telefono_emergencia : ['',Validators.required],
    grado : ['',Validators.required]
  })

  submit(){
    console.log(this.formInstructores.value);
    this.instructoresServices.createInstructor(this.formInstructores.value).subscribe(r=>{
      this.getInstructores();
    });
  }
}
