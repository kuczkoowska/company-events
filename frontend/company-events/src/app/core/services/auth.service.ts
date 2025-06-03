import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  private readonly API_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(): void {
    window.location.href = `${this.API_URL}/login`;
  }

  logout(): void {
    this.http.post(`${this.API_URL}/logout`, {}).subscribe(() => {
      this.currentUserSubject.next(null);
      window.location.href = '/';
    });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/user`);
  }

  isAuthenticated(): Observable<boolean> {
    return this.getUser().pipe(
      map(user => !!user)
    );
  }
}
