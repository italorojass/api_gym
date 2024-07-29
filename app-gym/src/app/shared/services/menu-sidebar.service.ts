import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuSidebarService {

  constructor() { }

  menuToggle = new Subject();


  set(value : boolean){
	  this.menuToggle.next(value)
  }
}
