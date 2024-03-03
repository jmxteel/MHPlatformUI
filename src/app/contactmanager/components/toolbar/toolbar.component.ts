import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-authentication';
import { SecurityService } from 'src/app/shared/security/security.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  securityObject: AppUserAuth | undefined;
  
  constructor(
    private securityService: SecurityService,
    private router: Router
    ) { 
    this.securityObject = securityService.securityObject;
  }
    
  logout(): void {
    this.securityService.logOut();
    this.securityObject = this.securityService.securityObject;
    localStorage.removeItem('AuthObject');
    this.router.navigateByUrl('/login');
  }
}
