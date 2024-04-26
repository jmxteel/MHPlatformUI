import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';
import { SecurityService } from 'src/app/shared/security/security.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  username!: string;

  constructor(
    private loginService: LoginService,
    private securityService: SecurityService,
  ) {}

  ngOnInit(): void {
    const auth = localStorage.getItem('AuthObject');
    const authObject = JSON.parse(auth!);
    this.username = authObject.userName;  
  }

}
