import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private readonly baseUrl = environment.apiUrl;

private readonly tokenName = environment.tokenJwtName

  constructor(private http: HttpClient) { 
    
  }


 setToken(token: string): void {
    localStorage.setItem(`${this.tokenName}`, token);
  }


    getToken(): string | null {
    return localStorage.getItem(`${this.tokenName}`);
  }

   clearToken(): void {
    localStorage.removeItem(`${this.tokenName}`);
  }


    isLoggedIn(): boolean {
    return !!this.getToken();
  }


  validateToken(): Observable<boolean> {
    const token = this.getToken();
    if (!token) return of(false);

    return this.http.post<{valid: boolean}>(`${this.baseUrl}/validate`, { token })
      .pipe(
        map(res => res.valid),
        catchError(() => of(false))
      );
  }

}
