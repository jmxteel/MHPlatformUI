import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { AppUser } from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-authentication';
import { ConfigurationService } from '../configuration/configuration.service';
import { MessageService } from '../messaging/message.service';

const API_ENDPOINT = "security";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  apiUrl: string = "";
  public hasChanged = new BehaviorSubject<number>(0);
  securityReset$ = this.hasChanged.asObservable();

  private responseDataSubject = new BehaviorSubject<any>(null);
  responseData$ = this.responseDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private configService: ConfigurationService,
    private msgService: MessageService
    ) { 
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
    }

  login(entity: AppUser): Observable<AppUserAuth> {
    // // Set username
    // this.securityObject.userName = entity.userName;

    // switch(entity.userName.toLowerCase()) {
    //   case "psheriff":
    //     this.securityObject.isAuthenticated = true;
    //     this.securityObject.canAccessProducts = true;
    //     this.securityObject.canAccessCategories = true;
    //     this.securityObject.canAccessLogs = true;
    //     this.securityObject.canAccessSettings = true;
    //     this.securityObject.canAddProduct = true;
    //     this.securityObject.canEditProduct = true;
    //     this.securityObject.canDeleteProduct = true;
    //     break;
      
    //     case "bjones":
    //       this.securityObject.isAuthenticated = true;
    //       this.securityObject.canAccessLogs = true;
    //       this.securityObject.canAccessSettings = true;
    //       break;

    //      default:
    //       this.securityObject.userName = "Invalid username or password";
    //       break;
    // }

    // return of(this.securityObject)

    delete entity.userId;

    return this.http.post<AppUserAuth>(this.apiUrl, entity, httpOptions)
          .pipe(
            tap(response => {
              //use object assign to update the current object
              // NOTE: DO NOT CREATE A NEW AppUserAuth object
              //      because that destroys all the reference of the object
              Object.assign(this.securityObject, response)

              // Inform every component that a login has occured
              this.hasChanged.next(1);
            }),
            catchError(
              this.handleError<AppUserAuth>('login', 
              'Invalid username or password', new AppUserAuth())
            ),
          );
  }

  setResponseData(data: any) {
    this.responseDataSubject.next(data);
    console.log(this.responseData$);
  }

  logOut(): void {
    this.securityObject.init(); 
    // Inform every component that a logout has occured
    this.hasChanged.next(0);
  }

  handleError<T>(operation = 'operation', msg = '', result?: T) {
    // Add error messages to message service
    return (error: any): Observable<T> => {
      // Clear any old messages
      this.msgService.clearExceptionMessages();
      this.msgService.clearValidationMessages();

      msg = "Status Code: " + error.status + " - " + msg || "";

      console.log(msg + " " + JSON.stringify(error));

      // Set the last exception generated
      this.msgService.lastException = error;

      switch (error.status) {
        case 400:  // Model State Error
          if (error.error) {
            // Add all error messages to the validationMessages list
            Object.keys(error.error.errors)
              .map(keyName => this.msgService
                .addValidationMessage(error.error.errors[keyName][0]));
            // Reverse the array so error messages come out in the right order
            this.msgService.validationMessages = this.msgService.validationMessages.reverse();
          }
          break;
        case 401:
          this.msgService.addExceptionMessage("Error 401: Not authorized");
          break;  
        case 403:
          this.msgService.addExceptionMessage("Error 403: Forbidden Access");
          break;            
        case 404:
          this.msgService.addExceptionMessage(msg);
          break;
        case 500:
          this.msgService.addExceptionMessage(error.error);
          break;
        case 0:
          this.msgService.addExceptionMessage(
            "Unknown error, check to make sure the Web API URL can be reached." + " - ERROR: " + JSON.stringify(error));
          break;
        default:
          this.msgService.addException(error);
          break;
      }

      // Return default configuration values
      return of(result as T);
    };
  }  
}
