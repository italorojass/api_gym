import { Component, OnInit } from '@angular/core';
import { MenuSidebarService } from '../../services/menu-sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  openMenu :boolean=false;

  collapseMenu(){
    this.openMenu=true;
  }

}
