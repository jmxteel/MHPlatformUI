import { EventEmitter, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  infoMessages: string[] = [];
  exceptionMessages: string[] = [];
  validationMessages: string[] = [];
  lastException: any;
  //exceptionMessageAdded: EventEmitter<any> = new EventEmitter<any>();
  public errorMessage = new BehaviorSubject<any>(null);
  errorMessage$ = this.errorMessage.asObservable();

  constructor() { }

  addInfoMessage(message: string) {
    console.info("Info: " + message);
    this.infoMessages.push(message);
  }

  clearInfoMessages() {
    this.infoMessages = [];
  }

  addValidationMessage(message: string) {
    console.info("Validation: " + message);
    this.validationMessages.push(message);
  }

  clearValidationMessages() {
    this.validationMessages = [];
  }
  
  addExceptionMessage(message: any) {
    if (message.message) {
      message = message.message + " - " + message.stack;
    }
    else if (typeof message == "object") {
      message = JSON.stringify(message);
    }

    console.error("Exception: " + message);
    this.exceptionMessages.push(message);
    this.errorMessage.next(this.exceptionMessages);
  }

  addException(error: HttpErrorResponse) {
    let iexp: any;

    // Set the last exception generated
    this.lastException = error;

    if (error) {
      console.error("Full Exception: " + JSON.stringify(error));
      this.exceptionMessages.push(error.message);
      if (error.error) {
        iexp = error.error.InnerException;
        while (iexp) {
          console.error("Exception: " + iexp.message);
          this.exceptionMessages.push(iexp.Message);
          iexp = iexp.InnerException;
        }
      }
    }
  }

  clearExceptionMessages() {
    this.exceptionMessages = [];
    this.lastException = null;
  }

  clearAll() {
    this.clearExceptionMessages();
    this.clearInfoMessages();
    this.clearValidationMessages();
  }

}
