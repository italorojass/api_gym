import { Component, EventEmitter, Output } from '@angular/core';
import { MenuSidebarService } from '../../services/menu-sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private helper: MenuSidebarService) {

  }
  showmenu: boolean = false;

  sendMenu() {
    //  this.menuToggle.emit(this.showmenu);
    this.helper.set(this.showmenu);
  }

}
