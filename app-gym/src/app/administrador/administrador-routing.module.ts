import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { InstructoresComponent } from './mantenedor/instructores/instructores.component';
import { InicioComponent } from './inicio/inicio.component';
import { IngresoAlumnoComponent } from '../shared/components/ingreso-alumno/ingreso-alumno.component';
import { MantenedorComponent } from './mantenedor/mantenedor.component';
import { DisciplinasComponent } from './mantenedor/disciplinas/disciplinas.component';
import { HorariosComponent } from './mantenedor/horarios/horarios.component';
import { PlanesComponent } from './mantenedor/planes/planes.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    canActivate: [AuthGuard],
    children : [
      {
        path : '',
        component : InicioComponent,

        data: { breadcrumb: 'Inicio' }
      },
      {
        path : 'alumnos',
        redirectTo : 'ingresar-alumno',
        pathMatch : 'full'
      },
      {
        path : 'ingresar-alumno',
        component : IngresoAlumnoComponent,
        data: { breadcrumb: 'Alumnos' }
      },
      {
        path : 'mantenedores',
        component : MantenedorComponent,
        data: { breadcrumb: 'Mantendores' },
        children : [
          {
          path: 'instructor',
          component : InstructoresComponent,
          data: { breadcrumb: 'Instructor' },
        },
        {
          path: 'disciplinas',
          component : DisciplinasComponent,
          data: { breadcrumb: 'Disciplinas' },
        },
        {
          path: 'horarios',
          component : HorariosComponent,
          data: { breadcrumb: 'Horarios' },

        },
        {
          path: 'planes',
          component : PlanesComponent,
          data: { breadcrumb: 'Planes' },

        }
      ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
