import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://monkfish-app-9x56s.ondigitalocean.app/v1/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Méthode pour se connecter
  public login(email: string, password: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Méthode pour s'inscrire
  public signup(email: string, password: string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { email, password, name });
  }

  // Méthode pour récupérer tous les utilisateurs avec gestion des erreurs
  public getAllUsers(): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });

    return this.http.get(`${this.apiUrl}/all`, {headers})
  }
}
