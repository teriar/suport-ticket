import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { nickValidator } from '../../validators/nickValidator';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api'
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/user';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageModule } from 'primeng/message';
import { newUser } from '../../../interfaces/newUser';
import { MessageComponent } from "../../components/message/message.component";
import { Message } from '../../../interfaces/message';

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
    MessageModule,
    MessageComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ConfirmationService,MessageService],
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({ opacity: 0, transform: 'scale(0)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('300ms ease-out')),
      transition('visible => hidden', animate('300ms ease-in'))
    ])
  ] 
})
export class LoginComponent implements OnInit{
    mensajeAlerta:Message ={ header: '', mensaje: '' ,icon:'',colorIcon:''};
    newUserForm:FormGroup;
    loginForm:FormGroup;
    isFlipped = false;
    showCheck = false;
    showValidation = true;
    showNickUsed = false;
    showMailUsed= false;
    mostrarAlerta= false;
    errorIcon = "pi pi-times";
    checkIcon ='pi pi-check';
  constructor(
    private readonly router: Router,
    private readonly  apiService: ApiService,
     private readonly fb:FormBuilder,
     private readonly confirm:ConfirmationService,
     private readonly message:MessageService,
     
   ){


   this.newUserForm = this.fb.group({
    nick:['',[Validators.required, Validators.minLength(5), nickValidator]],
    mail:['', [Validators.min(0), Validators.required, Validators.email],],
    password:['',[Validators.minLength(8), Validators.required]],
   })

   this.loginForm = this.fb.group({
    usuario:['',[Validators.required, Validators.minLength(5), nickValidator]],
    password:['',[Validators.minLength(8), Validators.required]],
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
      callback: this.SessionWhitGoogle
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
     
  }



  // integracion de google para logins y captcha



  SessionWhitGoogle =(response: any) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    
   this.apiService.RegisterWithGoogle(response.credential).subscribe({
    next: (res) => {
      if(res) {  this.router.navigate(['/home']);

       
      }else{
        this.message.add({
          severity: 'warn',
          summary: 'Error',
          detail: 'No se pudo verificar el usuario.'
        });
   
      }

    },
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
       this.showCheck=true;
       this.showValidation = false;
        },
        error: (err) => console.log('error:' , err )
      })
    });
  }


  loggin(event: Event){

    if(this.loginForm.invalid ){
     this.loginForm.markAllAsTouched();
     return;
   }
  

    console.log(this.loginForm.value)

   const usuario:Usuario ={
     nick:this.loginForm.controls['usuario'].value,
     password:this.loginForm.controls['password'].value

   }


    this.loginForm.reset()

   


    this.apiService.Login(usuario).subscribe({
      next: (res)=> {
        console.log('dddd', res)
        if (res){ 
          this.router.navigate(['/home']);
        }else{
           this.message.add({
          severity: 'warn',
          summary: 'Error',
          detail: 'usuario o contraseña incorrecta.'
        });
        }
        
        
      },
      error:(err)=> { 
       
       this.message.add({
          severity: 'warn',
          summary: 'Error',
          detail: 'Sin conexion.'
        });
   

      }

    })

  }

  register(){
this.mostrarAlerta = false;
 if(this.newUserForm.invalid  ||  this.showMailUsed || this.showNickUsed){
     this.newUserForm.markAllAsTouched();
     return;
   }


 this.confirm.confirm({
      message: 'Confirma Registro en sistema?',
      header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
      accept: () => {

         const data: newUser ={

    nick: this.newUserForm.controls["nick"].value,
    mail: this.newUserForm.controls["mail"].value,
    password: this.newUserForm.controls["password"].value
   }      
   
     this.apiService.register(data).subscribe({
      next: (res=>{
          
        if(res){
            this.router.navigate(['/home']);
        }else{

      this.mensajeAlerta.header ='Error en registro'
      this.mensajeAlerta.mensaje = 'No se pudo realizar el registro de Usuario, intentelo mas tarde.'
      this.mensajeAlerta.icon = this.errorIcon
      this.mensajeAlerta.colorIcon = 'red'
      this.mostrarAlerta = true;

        }

      })
     })


      },
    reject: ()=>{

      this.mensajeAlerta.header ='Cancelacion de Registro'
      this.mensajeAlerta.mensaje = 'Para poder acceder al sistema se requiere registro.'
      this.mensajeAlerta.icon = this.errorIcon
      this.mensajeAlerta.colorIcon = 'red'
      this.mostrarAlerta = true;
    
    }  
   });
  }



  validateNick=()=>{

     const nick = this.newUserForm.controls['nick'].value;
     console.log(nick);
     if(!nick) return;
     this.apiService.validateUserUsed(nick).subscribe({
      next: (res)=>{ 
       if(res){
        console.log(res);
        this.showNickUsed = true;
        return;
       }
       this.showNickUsed = false;
      }
     })
  }


 validateMail=()=>{

     const mail = this.newUserForm.controls['mail'].value;
     if(!mail) return;

     this.apiService.validateUserUsed(mail).subscribe({
      next: (res)=>{ 
       if(res){
         console.log(res);
        this.showMailUsed = true;
        return;
       }
       this.showMailUsed = false;
      }
     })
  }


}
