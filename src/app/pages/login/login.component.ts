import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { nickValidator } from '../../validators/nickValidator';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api'



declare const google: any; 
declare const grecaptcha:any;
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,       
    ReactiveFormsModule,
    ConfirmDialogModule,
    ButtonModule,
    Toast,
    
  
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ConfirmationService,MessageService] 
})
export class LoginComponent implements OnInit{

    newUserForm:FormGroup;
    loginForm:FormGroup;
    isFlipped = false;
  constructor(
    private readonly  apiService: ApiService,
     private readonly fb:FormBuilder,
     private readonly confirm:ConfirmationService,
     private readonly message:MessageService
   ){


   this.newUserForm = this.fb.group({
    nick:['',[Validators.required, Validators.minLength(5), nickValidator]],
    mail:['', [Validators.min(0), Validators.required, Validators.email],],
    password:['',[Validators.min(8), Validators.required]],
   })

   this.loginForm = this.fb.group({
    usuario:['',[Validators.required, Validators.minLength(5), nickValidator]],
    password:['',[Validators.min(8), Validators.required]],
   })

  }
      
 campoEsValidoLogin(campo:string){
    return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched;
  }


   campoEsValidoNewUser(campo:string){
    return this.newUserForm.controls[campo].errors && this.newUserForm.controls[campo].touched;
  }

  ngOnInit(): void {

       this.loginForm.disable();
       this.newUserForm.disable();
      google.accounts.id.initialize({
      client_id: '210711656809-e2ir0qdsrlc21tquu76ne166nnfg321l.apps.googleusercontent.com',
      callback: this.handleCredentialResponse
    });

     google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } 
    );
 google.accounts.id.prompt(); 

  }

  // reverso de login para registro

 toggleFlip() {
    this.isFlipped = !this.isFlipped;
     this.loginForm.disable();
       this.newUserForm.disable();
  }



  // integracion de google para logins y captcha



  handleCredentialResponse =(response: any) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    const send = response.credential
   this.apiService.loginWithGoogle(send).subscribe({
    next: (res) => console.log('Respuesta backend:', res),
    error: (err) => console.error('Error login Google:', err)
  });   
  }



 CaptchaOnClick(e:any) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LenhNgrAAAAAL1A1qG-kbmd9qM74Yo95HCYkVmI', {action: 'LOGIN'});
      console.log(token);
      this.apiService.captchaValidator(token).subscribe({
        next:(res)=>{ 
          console.log('OK validado token');
        this.loginForm.enable();
       this.newUserForm.enable();
        },
        error: (err) => console.log('error:' , err )
      })
    });
  }


  loggin(event: Event){

    if(this.loginForm.invalid){
     this.loginForm.markAllAsTouched();
     return;
   }
  

    console.log(this.loginForm.value)
    this.loginForm.reset()
  }

  register(event: Event){
 this.confirm.confirm({
      message: '¿Deseas iniciar sesión?',
      header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.message.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Sesión iniciada'
        });
      }
   });
  }

}
