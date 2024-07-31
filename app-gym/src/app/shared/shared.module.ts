import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbService } from './services/breadcrumb.service';
import { MenuSidebarService } from './services/menu-sidebar.service';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { IngresoAlumnoComponent } from './components/ingreso-alumno/ingreso-alumno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { ErrorsInterceptor } from '../interceptors/errors.interceptor';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    WidgetsComponent,
    MetricasComponent,
    IngresoAlumnoComponent,
    AlumnosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers : [
    BreadcrumbService,
    MenuSidebarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    }
  ],
  exports : [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    WidgetsComponent,
    MetricasComponent,
    IngresoAlumnoComponent
  ]
})
export class SharedModule { }
