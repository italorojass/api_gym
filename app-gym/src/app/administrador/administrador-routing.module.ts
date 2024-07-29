import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { InstructoresComponent } from './mantenedor/instructores/instructores.component';
import { InicioComponent } from './inicio/inicio.component';
import { IngresoAlumnoComponent } from '../shared/components/ingreso-alumno/ingreso-alumno.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,

    children : [
      {
        path : '',
        component : InicioComponent,
        data: { breadcrumb: 'Inicio' }
      },
      {
        path : 'ingresar-alumno',
        component : IngresoAlumnoComponent,
        data: { breadcrumb: 'Nuevo Alumno' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
