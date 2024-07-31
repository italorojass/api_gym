import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _router : Router, private fb: FormBuilder, private loginSv : AuthService){

  }

  loginForm= this.fb.group({
    username : ['',Validators.required],
    password : ['',Validators.required]
  })

  login(){
    console.log(this.loginForm.value);
    this.loginSv.login(this.loginForm.value).subscribe((r:any)=>{
      console.log(r);
      sessionStorage.setItem('access_token',r.token);
      let data = JSON.parse(atob(r.token.split('.')[1]));
      console.log(data);

      switch(data.role){
        case 1 :
         this._router.navigate(['/administrador']);
        break;
        case 2 :
         this._router.navigate(['/instructor']);
        break;
        case 3 :
        this._router.navigate(['/alumno']);
        break;


      }

    })
    //this._router.navigate(['/instructor']);
    /* this._router.navigate(['/administrador']); */
  }

  dictRoles(){
    return [{
      nombre:'Administrador',
      value : 1
    },
    {
      nombre:'Instructor',
      value : 2
    },
    {
      nombre:'Alumno',
      value : 3
    }]
  }

}
