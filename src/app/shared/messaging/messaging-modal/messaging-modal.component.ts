import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-messaging-modal',
  templateUrl: './messaging-modal.component.html',
  styleUrls: ['./messaging-modal.component.scss']
})
export class MessagingModalComponent {
  message: string = "";
  cancelButtonText = "Cancel";
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<MessagingModalComponent>)
  {
      if (data) {
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
      this.dialogRef.updateSize();
    }

    onConfirmClick(): void {
      this.dialogRef.close();
    }

}
