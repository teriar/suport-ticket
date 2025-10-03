import {  Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';




export const routes: Routes = [

{path:'login', component: LoginComponent},
{ path: '', redirectTo: '/login', pathMatch: 'full' }, 
{ path: '**', redirectTo: '/login', pathMatch: 'full' } // cambiar a pagina de error despues
];




export class AppRoutingModule { }