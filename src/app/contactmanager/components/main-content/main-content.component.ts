import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  username!: string;

  constructor(private loginService: LoginService,) {}

  ngOnInit(): void {
    const auth = localStorage.getItem('AuthObject');
    const authObject = JSON.parse(auth!);
    this.username = authObject.userName;  
  }
}
