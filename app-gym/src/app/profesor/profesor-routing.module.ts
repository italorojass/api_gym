import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { IngresoAlumnoComponent } from '../shared/components/ingreso-alumno/ingreso-alumno.component';

const routes: Routes = [{
  path : '',
  component : LayoutComponent,
  //data: { breadcrumb: 'Inicio' },
  children : [
    {
      path : '',
      component : IngresoAlumnoComponent,
      data: { breadcrumb: 'Nuevo alumno' },
    },
    {
      path : 'nuevo-alumno',
      component : IngresoAlumnoComponent,
      data: { breadcrumb: 'Nuevo alumno' },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
