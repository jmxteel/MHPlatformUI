import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagingModalComponent } from './messaging-modal/messaging-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exception-message',
  templateUrl: './exception-message.component.html',
  styleUrls: ['./exception-message.component.css']
})
export class ExceptionMessageComponent implements OnInit, OnDestroy {
  messageService: MessageService;
  private subscription: Subscription | undefined;

  constructor(
    private msgService: MessageService,
    private dialog: MatDialog
  ) { 
    this.messageService = msgService;
  }

  ngOnInit(): void {
    // this.subscription = this.messageService.exceptionMessageAdded$.subscribe( message => {
    //   this.openAlertDialog();
    // })    
    this.subscription = this.messageService.errorMessage$.subscribe( message => {
      if(message) {
        this.openAlertDialog();
      }
    })      
  }

  openAlertDialog() {
    const dialogRef = this.dialog.open(MessagingModalComponent,{
      data:{
        message: this.messageService.exceptionMessages,
        buttonText: {
          cancel: 'Ok'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.messageService.errorMessage.next(null);
      // Handle any actions afer dialog is closed
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
