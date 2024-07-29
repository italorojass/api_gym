import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _router : Router, private fb: FormBuilder){

  }

  loginForm= this.fb.group({
    user : ['',Validators.required],
    pass : ['',Validators.required]
  })

  go(){
    /* this._router.navigate(['/instructor']); */
    this._router.navigate(['/administrador']);
  }

}
