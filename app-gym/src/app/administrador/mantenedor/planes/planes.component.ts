import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MantenedoresService } from 'src/app/shared/services/mantenedores.service';
import { PlanesService } from '../services/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private planSv: PlanesService,) {

  }
  ngOnInit(): void {
    this.getPlanes();
  }
  planes: any = [];
  getPlanes() {
    this.planSv.getPlanes().subscribe(r => {
      this.planes = r;
    })
  }
  formPlanes = this.fb.group({
    plan: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', Validators.required]
  })

  submit() {

  }
}
