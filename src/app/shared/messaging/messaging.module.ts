import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionMessageComponent } from './exception-message.component';
import { MaterialModule } from '../material.module';
import { MessagingModalComponent } from './messaging-modal/messaging-modal.component';



@NgModule({
  declarations: [
    ExceptionMessageComponent,
    MessagingModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    ExceptionMessageComponent
  ]
})
export class MessagingModule { }
