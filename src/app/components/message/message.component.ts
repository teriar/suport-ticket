import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Message } from '../../../interfaces/message';

@Component({
  selector: 'app-message',
  imports: [DialogModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {


  @Input() mostrar : boolean = false;
  @Input() mensaje!:Message


  close(){
   console.log('dsadsdaa');
    this.mostrar=false;
  }

}


