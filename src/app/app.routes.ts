import {  Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guard/auth.guard';




export const routes: Routes = [

{path:'login', 
component: AuthLayoutComponent,
children:[
    {path:'', component:LoginComponent, pathMatch:'full'},
    {path:'**', component:LoginComponent, pathMatch:'full'}
]
},
{path:'home',
 component: MainLayoutComponent,
  canActivate: [authGuard],
 children:[
    {path:'', component:HomeComponent, pathMatch:'full'},
    {path:'**', component:NotFoundComponent, pathMatch:'full'}
 ]   
},


{ path: '', redirectTo: '/login', pathMatch: 'full' }, 
{ path: '**', component:NotFoundComponent, pathMatch: 'full' }
];




export class AppRoutingModule { }