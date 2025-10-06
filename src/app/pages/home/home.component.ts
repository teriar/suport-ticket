import { Component } from '@angular/core';

import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { CardTicketComponent } from "../../components/card-ticket/card-ticket.component";
import { NgForOf } from '@angular/common';
import { Ticket } from '../../../interfaces/ticket';



let pruebas:Array<Ticket>=[];
@Component({
  selector: 'app-home',
  imports: [SidebarComponent, CardTicketComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 sidebarVisible: boolean = false;


  pruebas = [
  {
    titulo: 'Primer aviso',
    cuerpo: 'Este es el contenido del primer aviso. Contiene información importante sobre el sistema.',
    estado: 'pendiente'
  },
  {
    titulo: 'Segundo aviso',
    cuerpo: 'Contenido del segundo aviso, que incluye detalles sobre actualizaciones recientes.',
    estado: 'en progreso'
  },
  {
    titulo: 'Tercer aviso',
    cuerpo: 'Este tercer aviso contiene instrucciones finales y recomendaciones para los usuarios.',
    estado: 'completado'
  }
];


}
