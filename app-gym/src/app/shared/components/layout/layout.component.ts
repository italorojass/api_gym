import { Component, OnInit } from '@angular/core';
import { MenuSidebarService } from '../../services/menu-sidebar.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  openSideBar : boolean=false;
  constructor(private helper: MenuSidebarService){

  }
  today:any;

  ngOnInit() {
    this.helper.menuToggle.subscribe((message:any) => this.openSideBar = message);
    this.today = new Date().getFullYear();
  }
}
