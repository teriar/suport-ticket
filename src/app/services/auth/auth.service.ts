import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs'
import { environment } from '../../environments/environment';
import { token } from '../../../interfaces/token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private readonly baseUrl = environment.apiUrl;

private readonly tokenName = environment.tokenJwtName

  constructor(private http: HttpClient) { 
    
  }


 


    getToken(): string | null {
    return localStorage.getItem(`${this.tokenName}`);
  }

     getTokenRefresh(): string | null {
    return localStorage.getItem(`refreshToken`);
  }

   clearToken(): void {
    localStorage.removeItem(`${this.tokenName}`);
     localStorage.removeItem(`refreshToken`);
  }


    isLoggedIn(): boolean {
    return !!this.getToken();
  }


  validateToken(): Observable<boolean> {
 
    const token = this.getToken();
    if (!token){ return of(false)};
   
      const headers = { Authorization: `Bearer ${token}` };
  return this.http.get<{ status: boolean }>(`${this.baseUrl}/validate`, { headers }).pipe(
    map(res => res.status), // mapeamos a boolean
    catchError(err => {
      if (err.status === 401) {
        console.log('Token expirado, intentando refresh...');
        return this.refreshToken(); // ya devuelve Observable<boolean>
      }
      return of(false);
    })
  );
}
  refreshToken():Observable<boolean>{
    
      const token = this.getTokenRefresh();
      const headers = { Authorization: `Bearer ${token}` };
    return  this.http.get<token>(`${this.baseUrl}/validate/refresh`, { headers })
      .pipe(map(res=>{
        if(res.status && res.tokens){
          this.clearToken();
          localStorage.setItem('userToken',res.tokens.userToken);
          localStorage.setItem('refreshToken',res.tokens.refreshToken)
          return true;
        }
        return false;

      }),catchError(err=>{
         console.error('No se pudo refreskar token', err);
        return of(false);

      }));
  }

}
