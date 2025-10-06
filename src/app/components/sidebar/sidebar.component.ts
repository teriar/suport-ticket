import { Component, Input, Output,EventEmitter } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';




@Component({
  selector: 'app-sidebar',
  imports: [SidebarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})



export class SidebarComponent {
 @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

 onHide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }


}



