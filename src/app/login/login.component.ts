import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '../security/app-user';
import { AppUserAuth } from '../security/app-user-authentication';
import { SecurityService } from '../shared/security/security.service';

@Component({
    selector: 'mh-login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })

export class LoginFormComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth | undefined;
  returnUrl: string | undefined;
  form!: FormGroup;

  // Input decorator to accept an error message from a parent component
  @Input() error!: string | null;

  // Output decorator with EventEmitter to emit form values on submit
  @Output() submitEM = new EventEmitter<{username: string; password: string}>();  

  constructor(
    private securityService: SecurityService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.securityObject = new AppUserAuth(); }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')!;
    this.buildFormValidator();
  }

  private buildFormValidator(){
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }
  
  submit(): void {
    if (this.form.valid) {
      // const { username, password } = this.form.value;
      // if (this.loginService.validateCredentials(username, password)) {
      //   // Emit the form value when the credentials are valid
      //   // this.submitEM.emit(this.form.value);
      //   // Navigate to /main/dashboard upon successful login
      //   this.router.navigate(['/main/dashboard']);        
      // } else {
      //   // Handle invalid credentials
      //   this.error = 'Invalid username or password';
      // }    
      this.user.userName = this.form.get('username')?.value;
      this.user.password = this.form.get('password')?.value;
      this.securityObject?.init();
      this.securityService.login(this.user).subscribe(
        response => {
        localStorage.setItem('AuthObject', JSON.stringify(response));
        this.securityObject = response;
        //if(this.returnUrl) {
          this.router.navigateByUrl('/main/dashboard');
        //}
      });
    }
  }


}