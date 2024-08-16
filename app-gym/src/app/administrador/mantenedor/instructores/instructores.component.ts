import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MantenedoresService } from 'src/app/shared/services/mantenedores.service';

@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css']
})
export class InstructoresComponent {
  instructores :any= [];
  getInstructores(){
    this.mansv.getInstructores().subscribe(r=>{
      this.instructores= r;
    })
  }

  constructor(private fb : FormBuilder,
    private mansv : MantenedoresService,
    private toastr: ToastrService){
    this.getInstructores();
  }
}
