import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { AppUser } from 'src/app/security/app-user';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';
import { MessageService } from 'src/app/shared/messaging/message.service';
import { SecurityService } from 'src/app/shared/security/security.service';
import { OrderForm } from '../components-models/order-form.model';

const API_ENDPOINT = "fileflow";
const API_ENDPOINT_All_CLIENTS = "client/allclients";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class InstallationDataService {
  apiUrl: string = "";
  apiUrl2: string = "";

  constructor(
    private http: HttpClient,
    private configService: ConfigurationService,
    private msgService: MessageService,
    private securityService: SecurityService
    ) { 
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
      this.apiUrl2 = this.configService.settings.apiUrl + API_ENDPOINT_All_CLIENTS;
    }

  getFileFlows(): Observable<any> {
    //Remove this code if you want to use authguard instead of.NET Security Policy
    //const auth = localStorage.getItem('AuthObject');
    //const authObject = JSON.parse(auth!); 
    // 

    //let httpOptions = new HttpHeaders()
    //If you want to use AuthGuard instead of .NET Security Policy, just un
    // .set('Authorization', 'Bearer '+ this.securityService.securityObject.bearerToken);
    //.set('Authorization', 'Bearer '+ authObject.bearerToken);  

    this.msgService.clearExceptionMessages();

    // return this.http.get<any>(this.apiUrl, { headers: httpOptions }).pipe(
    return this.http.get<any>(this.apiUrl).pipe(
        tap(response => {
            console.log('getFileFlows() response:'+ JSON.stringify(response));
        }),
        catchError(
          //this.securityService.handleError<any>('getFileFlow','Can`t retrieve FileFlow/Folders',[]))
          this.securityService.handleError<any>())
      );
  }

  getCustomers(): Observable<any> {
    //Remove this code if you want to use authguard instead of.NET Security Policy
    //const auth = localStorage.getItem('AuthObject');
    //const authObject = JSON.parse(auth!);
    //

    this.msgService.clearExceptionMessages();
    return this.http.get<any>(this.apiUrl2, {observe: 'response'}).pipe(
      tap(response => {
        console.log('getCustomers() response:'+ JSON.stringify(response));
      }),
      catchError(
        this.securityService.handleError<any>())
    )
  }

}
