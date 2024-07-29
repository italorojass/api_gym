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



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    WidgetsComponent,
    MetricasComponent,
    IngresoAlumnoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers : [
    BreadcrumbService,
    MenuSidebarService
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
