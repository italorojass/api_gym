import { AlumnnoModule } from './alumnno/alumnno.module';
import { AdministradorModule } from './administrador/administrador.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'instructor',
    loadChildren: () => import('./profesor/profesor.module').then(m => m.ProfesorModule),
  },
  {
    path : 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule),

  },
  {
    path : 'alumno',
    loadChildren: () => import('./alumnno/alumnno.module').then(m => m.AlumnnoModule),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true , onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
