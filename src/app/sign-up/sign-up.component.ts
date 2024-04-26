import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],  
})
export class SignUpComponent {
  constructor(private _formBuilder: FormBuilder) {}
  hidePassword = true;
  hideConfirmPassword = true;
  animation: string = '1s';

  branches: any[] = [
    {value: 1, viewValue: 'Main Plant'},
    {value: 2, viewValue: 'Cebu Showroom'},
    {value: 2, viewValue: 'Manila Showroom'},
  ];

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    assignedBranch: ['', Validators.required],
    address: [''],
  });
  secondFormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    email: ['', Validators.required],
  });
  isLinear = false;
}
