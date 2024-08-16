import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    // Implementa la lógica para verificar si el usuario está autenticado
    // Esto puede incluir verificar un token JWT en sessionStorage, una variable de sesión, etc.
    return !!sessionStorage.getItem('access_token');
  }

  // Método para iniciar sesión (esto es solo un ejemplo)
  login(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  // Método para cerrar sesión (esto es solo un ejemplo)
  logout(): void {
    sessionStorage.removeItem('access_token');
  }

}
