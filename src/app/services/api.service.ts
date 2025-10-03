import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


  constructor(private readonly http:HttpClient) { }


 
  loginWithGoogle(token: string): Observable<any> {
   
    const body = { id_token:token };

    return this.http.post(`${this.baseUrl}/register/google`, body, { headers: this.headers  });
  }



  captchaValidator(token:string): Observable<any>{
  
    const body = { token };
    return this.http.post(`${this.baseUrl}/captcha`, body, {headers:this.headers});
  }



}
