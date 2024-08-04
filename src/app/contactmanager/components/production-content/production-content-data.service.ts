import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { AppUser } from 'src/app/security/app-user';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';
import { MessageService } from 'src/app/shared/messaging/message.service';
import { SecurityService } from 'src/app/shared/security/security.service';
import { EmployeeTable } from './model/employee';

const API_ENDPOINT_All_CLIENTS = "client/allclients";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ProductionDataServices {
  apiUrl: string = "";

  constructor(
    private http: HttpClient,
    private configService: ConfigurationService,
    private msgService: MessageService,
    private securityService: SecurityService
    ) { 
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT_All_CLIENTS;
    }

  getCustomers(pageNumber: Number, pageSize: Number, filter?: string, q?: string): Observable<any> {
    //Remove this code if you want to use authguard instead of.NET Security Policy

    this.msgService.clearExceptionMessages();
    return this.http.get<any>(this.apiUrl+`?filter=${filter}&q=${q}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {observe: 'response'}).pipe(
      tap(response => {
        console.log('getCustomers() response:'+ JSON.stringify(response));
      }),
      catchError(
        this.securityService.handleError<any>())
    )
  }

<<<<<<< HEAD
  getCharacters(
    filters: {status?: string; gender?: string; name?: string; page: string;} = {status: '', gender: '', name: '', page: ''}): Observable<any> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<any>(
      `https://rickandmortyapi.com/api/character`,
      { params }
    );
  }  

  getCustomers2(filters: {status?: string; gender?: string; name?: string; page: string;} = {status: '', gender: '', name: '', page: ''}): Observable<any> {
    //Remove this code if you want to use authguard instead of.NET Security Policy

    this.msgService.clearExceptionMessages();
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<any>(this.apiUrl, {observe: 'response', params}).pipe(
      tap(response => {
        console.log('getCustomers() response:'+ JSON.stringify(response));
      }),
      catchError(
        this.securityService.handleError<any>())
    )
  }

=======
  public getEmployees(
    pageNumber: Number,
    pageSize: Number
  ): Observable<EmployeeTable> {
    const url = `https://reqres.in/api/users?page=${pageNumber}&per_page=${pageSize}`;

    return this.http.get<EmployeeTable>(url);
  }  

>>>>>>> 1193485ec2e4ab0cb36b47f89aea5dabd0cde5e5
}
