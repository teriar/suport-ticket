import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,catchError,map, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Register } from '../../interfaces/register';
import { Usuario } from '../../interfaces/user';
import { Login } from '../../interfaces/login';
import { newUser } from '../../interfaces/newUser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


  constructor(private readonly http:HttpClient) { }




  Login(user: Usuario): Observable<boolean> {
  const body = { user:user.nick, password:user.password };

  return this.http.post<Login>(`${this.baseUrl}/login`, body, { headers: this.headers }).pipe(
    map(res => {
      console.log(res);
      if (res.estado && res.tokens) {
        localStorage.setItem('userToken', res.tokens.userToken);
        localStorage.setItem('refreshToken', res.tokens.refreshToken);
      }
      return res.estado;
    }),
    catchError(err => {
      console.error('Error en login:', err);
      return of(false);
    })
  );
}



  register(NewUsuario:newUser):Observable<boolean>{

    const body = NewUsuario

  return this.http.post<Register>(`${this.baseUrl}/register`, body , { headers: this.headers  }).pipe
  (map(res=>{
       
    if(res.estado && res.tokens){
      localStorage.setItem('userToken',res.tokens.userToken);
      localStorage.setItem('refreshToken',res.tokens.refreshToken)
      return true;
      }
      return false;
    }),
      catchError(err => {
        console.error('Error en login:', err);
        return of(false);
      }));
  
    
  }



 
  RegisterWithGoogle(token: string): Observable<boolean> {
   
    const body = { id_token:token };

    return this.http.post<Register>(`${this.baseUrl}/register/google`, body, { headers: this.headers  }).pipe(map( res =>{
    
      if(res.estado && res.tokens){

      localStorage.setItem('userToken',res.tokens.userToken);
      localStorage.setItem('refreshToken',res.tokens.refreshToken)
      return true;
      }
      return false;
    }),
      catchError(err => {
        console.error('Error en login con Google:', err);
        return of(false);
      }));
  
    
  }



  captchaValidator(token:string): Observable<any>{
  
    const body = { token };
    return this.http.post(`${this.baseUrl}/captcha`, body, {headers:this.headers});
  }


  validateUserUsed(value: string): Observable<boolean | null> {
  return this.http.get<{ status:boolean}>(`${this.baseUrl}/register/inUse?value=${value}`)
    .pipe(
      map(res => res.status),
      catchError(err => {
        console.error('Error comprobacion de uso de usuario:', err);
        return of(null); 
      })
    );
}


}
