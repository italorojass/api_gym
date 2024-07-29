import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnnoRoutingModule } from './alumnno-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlumnnoRoutingModule,
    RouterModule
  ]
})
export class AlumnnoModule { }
