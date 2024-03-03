import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
   // Dummy credentials
   private readonly dummyUsername = 'admin';
   private readonly dummyPassword = 'admin123';
 
   constructor() { }
 
   // Method to validate credentials
   validateCredentials(username: string, password: string): boolean {
     return username === this.dummyUsername && password === this.dummyPassword;
   }
}
