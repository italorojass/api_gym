import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { RouterModule } from '@angular/router';
import { InstructoresComponent } from './mantenedor/instructores/instructores.component';
import { InicioComponent } from './inicio/inicio.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InstructoresComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class AdministradorModule { }
