import { AlumnnoModule } from './alumnno/alumnno.module';
import { AdministradorModule } from './administrador/administrador.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

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
   // canActivate: [AuthGuard],
    loadChildren: () => import('./profesor/profesor.module').then(m => m.ProfesorModule),
  },
  {
    path : 'administrador',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule),

  },
  {
    path : 'alumno',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./alumnno/alumnno.module').then(m => m.AlumnnoModule),
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true , onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
