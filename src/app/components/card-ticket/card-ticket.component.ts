import { Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from "primeng/button";
import { Ticket } from '../../../interfaces/ticket';
@Component({
  selector: 'app-card-ticket',
  imports: [Card, Button],
  templateUrl: './card-ticket.component.html',
  styleUrl: './card-ticket.component.css'
})
export class CardTicketComponent {


  @Input() ticket!: Ticket;
}
