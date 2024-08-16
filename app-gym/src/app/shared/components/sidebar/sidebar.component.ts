import { Component, OnInit } from '@angular/core';
import { MenuSidebarService } from '../../services/menu-sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  openMenu: boolean = false;
  menu: any = [];

  ngOnInit(): void {
    this.menu = [
      {
        title: 'Inicio',
        icon: 'fa-home',
        url: '/administrador'
      },
      {
        title: 'Alumnos',
        icon: 'fa-users',
        url: 'alumnos'
      },
      {
        title: 'Mantenedores',
        icon: 'fa-cog',
        openMenu : false,
        subItem: [
          {
            url: '/administrador/mantenedores/instructor',
          },
          {
            url: '/administrador/mantenedores/disciplinas',
          },
          {
            url: '/administrador/mantenedores/horarios',
          },
          {
            url: '/administrador/mantenedores/planes',
          }
        ]
      }
    ]
  }
  collapseMenu() {
    this.openMenu = true;
  }

}
